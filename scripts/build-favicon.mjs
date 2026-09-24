import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import toIco from "to-ico";

const svg = await readFile(new URL("./icon.svg", import.meta.url));

async function png(size) {
  return sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();
}

const png48 = await png(48);
const png180 = await png(180);
const png192 = await png(192);
const ico = await toIco([png48, await png(32), await png(16)]);

await writeFile(new URL("../public/favicon.ico", import.meta.url), ico);
await writeFile(new URL("../public/favicon.png", import.meta.url), png192);
await writeFile(new URL("../public/apple-touch-icon.png", import.meta.url), png180);
