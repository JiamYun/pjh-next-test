import fs from "fs";
import path from "path";

const ICONS_DIR = path.join(__dirname, "../../public/images/icons");
const OUTPUT_FILE = path.join(__dirname, "../types/icons/index.ts");

function scanIcons(dir: string): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      const subDir = path.join(dir, item.name);
      const icons = fs
        .readdirSync(subDir)
        .filter((file) => file.endsWith(".svg"))
        .map((file) => path.parse(file).name);
      result[item.name] = icons;
    }
  }

  return result;
}

function generateTypeDefinitions(icons: Record<string, string[]>): string {
  let output =
    "export type IconType = " +
    Object.keys(icons)
      .map((type) => `'${type}'`)
      .join(" | ") +
    ";\n\n";
  output += "export type IconName = {\n";
  for (const [type, names] of Object.entries(icons)) {
    output += `  ${type}: ${names.map((name) => `'${name}'`).join(" | ")};\n`;
  }
  output += "};\n";
  return output;
}

const icons = scanIcons(ICONS_DIR);
const typeDefinitions = generateTypeDefinitions(icons);

fs.writeFileSync(OUTPUT_FILE, typeDefinitions);
console.log(`Icon type definitions generated at ${OUTPUT_FILE}`);
