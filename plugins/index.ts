import matter from "gray-matter";
import path from "path";
import { UserConfig } from "vite";
import { processMarkdown } from "../src/utils/Markdown";
import * as fs from "fs";
import { VFile } from "vfile";

type MD_DATA = {
    frontmatter: {
        [key: string]: any;
    };
    markdown: VFile;
}

export async function markdownPreprocess(mdDirPath: string) {
  const subDirArr = fs.readdirSync(mdDirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const mdMap: Record<string, Record<string, Record<string, any>>> = {};

  subDirArr.forEach((subDir) => {
    const dirPath = path.join(mdDirPath, subDir);
    const files = fs.readdirSync(dirPath);
    
    const mdFileMap: Record<string, MD_DATA> = {};

    files.forEach(async (file) => {
      const name = file.split(".")[0];
      const fp = path.join(dirPath, file);
      const rawMD = fs.readFileSync(fp, 'utf8');
      const { data, content } = matter(rawMD);
      const sectionMarkdown = await processMarkdown(String(content));

      mdFileMap[name] = {
        'frontmatter': data,
        'markdown': sectionMarkdown
      };
    });

    mdMap[subDir] = mdFileMap;
  });

  return {
    name: 'markdown-preprocessing',
    config(): UserConfig | null | void {
      return {
        define: {
          __MARKDOWN_MAP__: mdMap,
        },
      };
    },
  };
}