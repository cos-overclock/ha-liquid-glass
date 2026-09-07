import { en } from "./translations/en";
import { ja } from "./translations/ja";
import type { Dict } from "./translations/types";

export type { Dict };

const dicts: Record<string, Dict> = { ja, en };

export type Translator = (key: string, vars?: Record<string, string | number>) => string;

const translators = Object.fromEntries(
  Object.entries(dicts).map(([language, dict]) => [language, ((key, vars) => {
    let s = dict[key] ?? en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    }
    return s;
  }) satisfies Translator]),
) as Record<string, Translator>;

export function createTranslator(language: string | undefined): Translator {
  const lang = (language ?? "en").toLowerCase().split("-")[0];
  return translators[lang] ?? translators.en;
}

export function relativeTime(iso: string | undefined, t: Translator): string {
  if (!iso) return "";
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const s = Math.round(diff / 1000);
  if (s < 30) return t("just_now");
  if (s < 90) return t("seconds_ago", { n: s });
  const m = Math.round(s / 60);
  if (m < 60) return t("minutes_ago", { n: m });
  const h = Math.round(m / 60);
  if (h < 48) return t("hours_ago", { n: h });
  return t("days_ago", { n: Math.round(h / 24) });
}

export function clockTime(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
