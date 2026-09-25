import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const demoUrl = process.env.DEMO_URL ?? "http://127.0.0.1:5173/demo/";
const output = resolve("docs/images");
const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "google-chrome",
];
const chromePath = chromeCandidates.find((candidate) => candidate && (!candidate.includes("\\") || existsSync(candidate)));
if (!chromePath) throw new Error("Set CHROME_PATH to a Chrome or Edge executable");

const profile = mkdtempSync(join(tmpdir(), "lg-screenshots-"));
const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
  "--remote-allow-origins=*", "--remote-debugging-port=0",
  `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });

let socket;
let nextId = 0;
const pending = new Map();

function command(method, params = {}) {
  return new Promise((resolveCommand, reject) => {
    const id = ++nextId;
    pending.set(id, { resolveCommand, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function waitFor(predicate, timeout = 15000) {
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    if (await evaluate(predicate)) return;
    await sleep(100);
  }
  throw new Error(`Timed out waiting for: ${predicate}`);
}

async function navigate(url, width, height) {
  await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 2, mobile: false });
  await command("Page.navigate", { url });
  await waitFor(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete' && Boolean(document.querySelector('main')?.firstElementChild?.shadowRoot?.querySelector('.card,.panel,.separator'))`);
  await evaluate("document.fonts.ready");
  await sleep(1500);
  await evaluate("document.querySelector('.bar').style.display = 'none'; document.documentElement.style.scrollBehavior = 'auto'; true");
}

async function capture(path, clip) {
  const result = await command("Page.captureScreenshot", {
    format: "png", captureBeyondViewport: true, fromSurface: true,
    ...(clip ? { clip } : {}),
  });
  writeFileSync(path, Buffer.from(result.data, "base64"));
  console.log(path);
}

const cardNames = [
  "light", "vacuum", "fan", "humidifier", "person", "todo", "update", "timer",
  "alarm-control-panel", "climate", "switch", "sensor", "binary-sensor", "lock",
  "cover", "media", "slider", "select", "weather", "button", "scene", "camera",
  "group", "separator", "badge",
];
const selectedCardNames = process.env.CARDS?.split(",") ?? cardNames;
const variantIndex = { sensor: 1, select: 1, separator: 1 };

try {
  const portFile = join(profile, "DevToolsActivePort");
  const until = Date.now() + 15000;
  while (!existsSync(portFile) && Date.now() < until) await sleep(100);
  if (!existsSync(portFile)) throw new Error("Chrome debugging port did not start");
  const port = readFileSync(portFile, "utf8").split(/\r?\n/, 1)[0];
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = pages.find((item) => item.type === "page");
  if (!page) throw new Error("Chrome did not open a page");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolveCommand(message.result);
  });
  await new Promise((done, reject) => {
    socket.addEventListener("open", done, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

  mkdirSync(join(output, "cards"), { recursive: true });
  if (!process.env.CARDS) {
    await navigate(`${demoUrl}?focus=overview&width=380`, 1600, 1050);
    await capture(join(output, "dashboard.png"));
  }

  for (const name of selectedCardNames) {
    console.log(`Capturing ${name}`);
    await navigate(`${demoUrl}?focus=${name}&width=380`, 620, 900);
    const index = variantIndex[name] ?? 0;
    const rectangle = await evaluate(`(() => {
      const main = document.querySelector('main');
      const card = main.children[${index}];
      if (!card) throw new Error('Missing card: ${name}');
      for (const other of [...main.children]) if (other !== card) other.remove();
      const rect = card.shadowRoot.querySelector('.card,.panel,.separator').getBoundingClientRect();
      return { x: Math.max(0, rect.x - 24), y: Math.max(0, rect.y - 24), width: rect.width + 48, height: rect.height + 48, scale: 1 };
    })()`);
    await capture(join(output, "cards", `${name}.png`), rectangle);
  }
} finally {
  socket?.close();
  chrome.kill();
  if (chrome.exitCode === null) await new Promise((done) => chrome.once("exit", done));
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 });
  } catch (error) {
    console.warn(`Could not remove temporary Chrome profile: ${error.message}`);
  }
}
