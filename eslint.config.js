import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/**
 * The rules worth enforcing on this codebase, and no more.
 *
 * Formatting is left alone deliberately — the source has a consistent hand-written
 * style that no printer reproduces, and reflowing it would bury real changes. What is
 * checked is what a reviewer cannot reliably catch by reading: the rules of hooks, stale
 * effect dependencies, floating promises, and dead code.
 */
export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "demo/**", "pen/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // This file is not part of the app's tsconfig, so it cannot be type-checked.
  { files: ["**/*.js"], ...tseslint.configs.disableTypeChecked },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,

      /*
       * The glass controls run their geometry and motion values through refs on purpose:
       * a lens follows the pointer at 60fps and must not re-render React to do it. The
       * compiler's ref and immutability rules describe a model this deliberately sits
       * outside of, and the imperative writes in the group card are the Home Assistant
       * card contract, not accidents.
       */
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",

      /*
       * Several cards mirror an incoming entity value into state through an effect.
       * It is the pattern React would rather we avoided, and worth revisiting, but the
       * behaviour is pinned by tests — so surface it without failing the build.
       */
      "react-hooks/set-state-in-effect": "warn",

      // The cards read untyped `hass.states[...]` attributes everywhere and narrow them
      // at the point of use; a blanket ban on `any`-ish values would be noise.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      // A service call that is deliberately not awaited must say so with `void`.
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",

      // tsc already reports unused locals; leave that to it rather than duplicating.
      "@typescript-eslint/no-unused-vars": "off",

      /*
       * The Home Assistant stubs in the tests implement an async interface with nothing
       * to await. Marking them async is what makes them match the type.
       */
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      // Tests reach into internals and stub globals on purpose.
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  },
);
