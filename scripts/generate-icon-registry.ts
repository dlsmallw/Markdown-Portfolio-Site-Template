import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "/markdown");
const OUTPUT_FILE = path.join(process.cwd(), "/src/generated/iconRegistry.ts");

const iconPattern = /iconkey\s*=\s*["']([A-Za-z0-9]+)["']/g;

/**
 * Recursively loads the markdown content as strings for use in parsing to locate instances
 * where react icons are used.
 * @param directory     The directory the markdown content is located.
 * @returns             An array consisting of the markdown content in string format.
 */
function getMarkdownFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return getMarkdownFiles(fullPath);
      }

      return /\.(md|mdx)$/i.test(entry.name) ? [fullPath] : [];
    });
}

const icons = new Set<string>();
const mdFiles = getMarkdownFiles(CONTENT_DIR);

for (const file of mdFiles) {
  const content = fs.readFileSync(file, "utf8");

  for (const match of content.matchAll(iconPattern)) {
    icons.add(match[1]);
  }
}

const sortedIcons = [...icons].sort();

const imports = sortedIcons
  .map((icon) => `import { ${icon} } from "react-icons/${icon.slice(0, 2).toLowerCase()}";`)
  .join("\n");

const registry = `
${imports}

export const iconRegistry = {
${sortedIcons.map((icon) => `  ${icon},`).join("\n")}
};
`;

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, registry.trim() + "\n");

console.log(`Generated icon registry with ${icons.size} icons.`);