import { useRef, useState } from "react";
import type { HomeAssistant } from "../types";

/** Shared treatment for small entity controls, including keyboard and narrow layouts. */
export const entityControlStyles = `
  .entity-controls { display: flex; flex-wrap: wrap; gap: 8px; }
  .entity-button, .entity-input {
    min-width: 0; min-height: 36px; border: 0; border-radius: 18px;
    padding: 8px 14px; font: inherit; font-size: var(--lg-label);
    color: var(--lg-text-primary); background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .entity-button { cursor: pointer; overflow-wrap: anywhere; }
  .entity-button.primary, .entity-button[aria-pressed="true"] { background: #007d91; color: white; }
  .entity-button:disabled { opacity: .45; cursor: default; }
  .entity-button:focus-visible, .entity-input:focus-visible { outline: 2px solid #30b0c7; outline-offset: 2px; }
  .entity-caption { color: var(--lg-text-secondary); font-size: var(--lg-label); overflow-wrap: anywhere; }
  .entity-error { color: var(--lg-lock-unlocked-deep); font-size: var(--lg-label); }
  .entity-value { font-size: clamp(28px, 10cqi, 42px); font-weight: 650; font-variant-numeric: tabular-nums; }
  .entity-progress { width: 100%; height: 8px; accent-color: #007d91; }
`;

export function finiteNumber(value: unknown): number | undefined {
  if (typeof value !== "number" && (typeof value !== "string" || !value.trim())) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

/** Serialize user operations and surface failures without unhandled promise rejections. */
export function useEntityService(hass: HomeAssistant | undefined, entityId: string | undefined) {
  const [status, setStatus] = useState<{ entityId?: string; pending: boolean; failed: boolean }>({ pending: false, failed: false });
  const busy = useRef(false);
  const call = async (service: string, data: Record<string, unknown> = {}): Promise<boolean> => {
    if (!hass || !entityId || busy.current) return false;
    busy.current = true;
    setStatus({ entityId, pending: true, failed: false });
    try {
      await hass.callService(entityId.split(".")[0], service, { ...data, entity_id: entityId });
      setStatus({ entityId, pending: false, failed: false });
      return true;
    } catch {
      setStatus({ entityId, pending: false, failed: true });
      return false;
    } finally {
      busy.current = false;
    }
  };
  return { call, pending: status.pending, failed: status.entityId === entityId && status.failed };
}
