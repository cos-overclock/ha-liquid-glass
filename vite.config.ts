import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
) as { version: string };

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
    plugins: [react(), deployToHomeAssistant()],
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
