import * as esbuild from "esbuild";
import { readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const watch = process.argv.includes("--watch");
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

// Stamped into the console banner so the loaded build can be identified at a glance.
// A stale copy in Home Assistant's `www` folder is otherwise indistinguishable from a fresh one.
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

/** @type {esbuild.BuildOptions} */
const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  target: "es2020",
  minify: !watch,
  sourcemap: watch ? "inline" : false,
  outfile: "dist/liquid-glass-cards.js",
  legalComments: "none",
  logLevel: "info",
  define: {
    __LG_VERSION__: JSON.stringify(pkg.version),
    __LG_BUILD__: JSON.stringify(stamp),
  },
};

/**
 * Set HA_WWW to a Home Assistant `www` folder to have each build land there directly,
 * e.g. HA_WWW=//homeassistant/config/www or HA_WWW=Z:/config/www.
 * Copying by hand is the usual reason Home Assistant keeps serving an older bundle.
 */
function deploy() {
  const dest = process.env.HA_WWW;
  if (!dest) return;
  try {
    mkdirSync(dest, { recursive: true });
    copyFileSync(options.outfile, join(dest, "liquid-glass-cards.js"));
    console.log(`copied to ${join(dest, "liquid-glass-cards.js")}`);
  } catch (err) {
    console.error(`could not copy to ${dest}: ${err.message}`);
    process.exitCode = 1;
  }
}

if (watch) {
  const ctx = await esbuild.context({
    ...options,
    plugins: [{ name: "deploy", setup: (build) => build.onEnd(deploy) }],
  });
  await ctx.watch();
} else {
  await esbuild.build(options);
  console.log(`built v${pkg.version} (${stamp})`);
  deploy();
}
