import { act as preactAct } from "preact/test-utils";

declare const VOID_ONLY: unique symbol;
/**
 * A return type nothing but `void` satisfies.
 *
 * TypeScript lets a function returning anything stand in for one returning `void`, which
 * would make the first overload below swallow every call. The unresolvable union blocks
 * that, the same way `@types/react` blocks it.
 */
type VoidOnly = void | { [VOID_ONLY]: never };

/**
 * `act`, typed the way React typed it.
 *
 * The cards render on Preact's runtime, so the tests drive it with Preact's `act`, whose
 * callback is declared to return nothing while the tests hand it expressions —
 * `root.render(…)`, `element.dispatchEvent(…)` — that happen to evaluate to something.
 * At runtime `act` only asks whether the result is thenable, so an async callback is
 * still awaited and every other value is ignored.
 *
 * A callback that returns nothing reports `void`, even though `act` always hands back a
 * promise: the tests that drive a synchronous render do not await it, and typing it
 * honestly there would make every one of those calls a floating promise.
 */
export function act(callback: () => VoidOnly): void;
export function act(callback: () => unknown): Promise<void>;
export function act(callback: () => unknown): Promise<void> | void {
  return preactAct(callback as () => void | Promise<void>);
}
