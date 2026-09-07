import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
) as { version: string };

/**
 * React's API, on Preact's runtime.
 *
 * Home Assistant loads this bundle on every dashboard, and react-dom is by far the
 * largest thing in it — around 260 kB of the 600 kB, for a set of cards that uses hooks,
 * refs and portalless rendering into a shadow root and nothing else React 19 added.
 * `preact/compat` covers that surface at roughly a fifth of the size.
 *
 * The alias is deliberately the only place this is arranged: the source keeps importing
 * `react`, the types stay `@types/react`, and the tests run against the same substitution
 * the bundle ships, so nothing is verified on a runtime the users never get.
 */
const preactAliases = [
  { find: "react-dom/client", replacement: "preact/compat/client" },
  { find: "react-dom/server", replacement: "preact/compat/server" },
  { find: "react-dom/test-utils", replacement: "preact/test-utils" },
  { find: "react-dom", replacement: "preact/compat" },
  { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" },
  { find: "react/jsx-dev-runtime", replacement: "preact/jsx-dev-runtime" },
  { find: "react", replacement: "preact/compat" },
];

const outputName = "liquid-glass-cards.js";
const outputFile = resolve("dist", outputName);

function buildStamp(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

/** Copy the latest bundle directly into Home Assistant when HA_WWW is set. */
function deployToHomeAssistant(): Plugin {
  return {
    name: "deploy-to-home-assistant",
    apply: "build",
    writeBundle() {
      const destinationDirectory = process.env.HA_WWW;
      if (!destinationDirectory) return;

      mkdirSync(destinationDirectory, { recursive: true });
      const destination = join(destinationDirectory, outputName);
      copyFileSync(outputFile, destination);
      console.log(`copied to ${destination}`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const developmentBuild = mode === "development";
  const stamp = buildStamp();

  return {
    plugins: [deployToHomeAssistant()],
    resolve: { alias: preactAliases },
    test: {
      /*
       * `@samasante/liquid-glass` imports React itself, and Vitest hands a bare
       * node_modules dependency to Node untouched — which would load the real React
       * beside the cards' Preact and leave the two disputing who owns the hooks.
       * Inlining routes it through the alias, exactly as the bundle does.
       */
      server: { deps: { inline: ["@samasante/liquid-glass"] } },
    },
    define: {
      __LG_VERSION__: JSON.stringify(packageJson.version),
      __LG_BUILD__: JSON.stringify(stamp),
      "process.env.NODE_ENV": JSON.stringify(developmentBuild ? "development" : "production"),
    },
    build: {
      target: "es2020",
      minify: developmentBuild ? false : "oxc",
      sourcemap: developmentBuild ? "inline" : false,
      copyPublicDir: false,
      lib: {
        entry: resolve("src/index.ts"),
        formats: ["es"],
        fileName: () => outputName,
      },
    },
  };
});
