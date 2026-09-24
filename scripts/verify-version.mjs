import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const packageLock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
const bundle = readFileSync(new URL("../dist/liquid-glass-cards.js", import.meta.url), "utf8");
const version = packageJson.version;
const tag = process.argv[2];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

if (packageLock.version !== version || packageLock.packages?.[""]?.version !== version) {
  fail(`Package versions differ: package.json=${version}, package-lock.json=${packageLock.version}, lock root=${packageLock.packages?.[""]?.version}`);
}

const expectedBanner = `/*! ha-liquid-glass v${version} */`;
if (bundle.split(/\r?\n/, 1)[0] !== expectedBanner) {
  fail(`Bundle version differs: expected ${expectedBanner}`);
}

if (tag) {
  if (!/^v\d+\.\d+\.\d+$/.test(tag)) {
    fail(`Release tag must be a stable version such as v1.0.0: ${tag}`);
  } else if (tag !== `v${version}`) {
    fail(`Release tag ${tag} does not match package.json version ${version}`);
  }
}

if (!process.exitCode) console.log(`Version verified: ${tag ?? `v${version}`}`);
