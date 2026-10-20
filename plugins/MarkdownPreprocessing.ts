import { resolve } from 'node:path';
import type { UserConfig } from "vite";
import * as fs from "fs";

import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import matter from "gray-matter";

import type { DataMap, VFile } from 'vfile';
import { unified } from 'unified';

import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

import type { 
  BlockContent, 
  DefinitionContent, 
  PhrasingContent, 
  Root 
} from 'mdast';

type Data = {
  frontmatter?: Record<string, any>;
  sectionOrderData?: { id: string; navLabel: string; }[]
} & Partial<DataMap>;

interface CustomVFile extends VFile {
  data: Data;
};

interface PAGE_MD_DATA {
    sectionData: { id: string; navLabel: string; }[];
    markdown: VFile;
}

function toVFile(filename: string, relativePath: string) {
  const fp = resolve(relativePath, filename);
  const fileContents = fs.readFileSync(fp, 'utf-8');
  const { data: frontmatter, content: rawMD } = matter(fileContents);

  return {
    value: rawMD,
    dirname: relativePath,
    path: fp,
    data: { frontmatter } as Data
  } as CustomVFile;
}

function featuredProjectsDirective() {
  return () => {
    return (tree: Root, file?: VFile) => {
      const fileData = file?.data as Data | undefined;
      const frontmatter = fileData?.frontmatter ?? {};
      const currDir = (file && file.dirname) ? file.dirname : process.cwd();
      const sectionDir = frontmatter['sectionRoot'] ? resolve(currDir, frontmatter['sectionRoot']) : undefined;

      visit(tree, (node, index, parent) => {
        if (
          node.type === 'textDirective' ||
          node.type === 'leafDirective' ||
          node.type === 'containerDirective'
        ) {
          const data = node.data || (node.data = {});
          let attr = node.attributes || {};

          if (
            node.name.toLowerCase() === 'section-container' &&
            node.attributes.id === 'projects-section'
          ) {
            const newChildren = node.children.filter((child) => {
              // Allows all directive types except for project-blocks without the "featured" className
              if (
                child.type === 'containerDirective' ||
                child.type === 'leafDirective' ||
                child.type === 'textDirective'
              ) {
                if (
                  child.name === 'project-block' &&
                  child.attributes['className'] &&
                  child.attributes['className'] === 'featured'
                ) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return true;
              }

            });

            node.children = newChildren as typeof node.children;
          }

          const hast = h(node.name, attr);

          data.hName = hast.tagName;
          data.hProperties = hast.properties;
        }
      });
    };
  };
}

/**
 * A custom plugin used to parse the raw markdown files and associate the correct React element type.
 * @returns     The parsed node tree.
 */
function defaultDirectivePlugin() {
  return () => {
    return (tree: Root, file?: VFile) => {
      const fileData = file?.data as Data | undefined;
      const frontmatter = fileData?.frontmatter ?? {};
      const currDir = (file && file.dirname) ? file.dirname : process.cwd();
      const sectionDir = frontmatter['sectionRoot'] ? resolve(currDir, frontmatter['sectionRoot']) : undefined;

      // console.log(`File: ${file}`);
      // console.log(`FM: ${frontmatter}`);
      // console.log(`CDir: ${currDir}`);

      visit(tree, (node, index, parent) => {
        if (
          node.type === 'textDirective' ||
          node.type === 'leafDirective' ||
          node.type === 'containerDirective'
        ) {
          const data = node.data || (node.data = {});
          let attr = node.attributes || {};

          if (node.name.toLowerCase().includes('link') || node.name.toLowerCase().includes('button')) {
            let defaultText = node.name.includes("email") ? node.attributes?.href?.split(":")[1] : "";

            for (const child of node.children) {
              if (
                child.type === 'textDirective' ||
                child.type === 'leafDirective' ||
                child.type === 'containerDirective'
              ) {
                if (defaultText === "" && child.name === "img" && child.attributes) {
                  defaultText = child.attributes.alt ?? "";
                }

                if (child.attributes && (!child.attributes.id || child.attributes.id.length < 1)) {
                  child.attributes.id = 'link';
                }
              }
            }

            if (
              (node.children.some((child) => 'name' in child && child.name != null && ['img', 'themed-icon'].includes(child.name))) &&
              (!node.children.some((child) => child.type === 'text'))
            ) {
              node.children.push({
                type: "text",
                value: defaultText
              } as never)
            }
          }

          if (node.name === 'themed-icon') {
            const newAttr: Record<string, any> = {};
            const themeSources: Record<string, string> = {}

            Object.keys(attr).forEach((key) => {

              const attrName = key.toLowerCase();
              const attrVal = attr[key];

              if (attrName.includes('theme') && attrName.includes('src')) {
                if (!attrVal || attrVal.length < 1) return;

                const theme = attrName.replaceAll('-', '')
                  .replaceAll('theme', '')
                  .replaceAll('src', '');

                themeSources[theme] = attrVal;
              } else {
                newAttr[key] = attrVal;
              }
            });

            newAttr['themesrcs'] = JSON.stringify(themeSources);
            attr = newAttr;
          }

          const hast = h(node.name, attr);

          data.hName = hast.tagName;
          data.hProperties = hast.properties;
        }
      });
    };
  };
}

/**
 * Converts the markdown from a string to a node tree to be parsed.
 * @param mdVirtualFile         The raw VFile markdown.
 * @param plugins               Plugins used for parsing the markdown.
 * @returns                     The processed markdown file as VFile.
 */
async function markdownToNodeTree(mdVirtualFile: CustomVFile, plugins: (() => (tree: Root, file?: VFile) => void)[]) {
  return await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(plugins)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .process(mdVirtualFile);
}

/**
 * Takes a raw markdown string and parses it into an AST node tree.
 * @param mdRaw       The raw markdown file as a string.
 * @param plugins     the plugins to be applied while processing.
 * @returns           Returns an AST node tree representing the markdown file.
 */
async function parseMDToAST(mdRaw: string, plugins: (() => (tree: Root, file?: VFile) => void)[]) {
  return await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(plugins)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .process(mdRaw);
}

/**
 * Processes a markdown file, converting custom directives and standard react markdown syntax to React components.
 * @param mdVFile     The markdown as a virtual file.
 * @returns           The fully processed markdown file as React components in string from.
 */
async function processMDToComponents(mdVFile: CustomVFile): Promise<VFile> {
  return await markdownToNodeTree(
    mdVFile,
    [defaultDirectivePlugin()]
  );
}

async function parsePageMD(
  filename: string, 
  relativePath: string, 
  plugins: (() => (tree: Root, file?: VFile) => void)[] = [defaultDirectivePlugin()]
) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(plugins)
    .use(remarkStringify);

  const pageLayoutMDVFile = toVFile(filename, relativePath);
  const sectionOrderData: { id: string; navLabel: any; }[] | undefined = [];

  const pageNodeTree = processor.parse(pageLayoutMDVFile);
  const cloneTree = structuredClone(pageNodeTree);
  visit(cloneTree, (node) => {
    if (
      node.type === 'textDirective' ||
      node.type === 'leafDirective' ||
      node.type === 'containerDirective'
    ) {
      if (
        ('name' in node) && 
        (node.name === 'section-ref') &&
        ('children' in node) &&
        (pageLayoutMDVFile.data.frontmatter?.['sectionRoot'])
      ) {
        node.type = 'containerDirective';
        node.name = 'section-container';

        const textNode = node.children.find((childNode) => childNode.type === 'text' && 'value' in childNode);
        if (textNode) {
          
          const sectionName = textNode.value.split('.')[0];
          const sectionMDVFile = toVFile(textNode.value, resolve(relativePath, pageLayoutMDVFile.data.frontmatter['sectionRoot']));
          const navLabel = sectionMDVFile.data.frontmatter?.['navLabel'];

          sectionOrderData.push({ id: sectionName, navLabel: navLabel });
          const sectionAST = processor.parse(sectionMDVFile).children;

          node.attributes = { ...node.attributes, id: `${sectionName}-section`, navLabel: navLabel }
          node.children = sectionAST as (BlockContent | DefinitionContent)[] | PhrasingContent[];
        }
      }
    }
  });

  const processedMD = await parseMDToAST(processor.stringify(cloneTree), plugins) as CustomVFile;
  processedMD.data.sectionOrderData = sectionOrderData;
  return processedMD;
}

export async function markdownPreprocess(mdDirPath: string) {
  const pages = fs.readdirSync(mdDirPath, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name);

  const mdMap: Record<string, PAGE_MD_DATA> = {};

  for (const page of pages) {
    const pageName = page.split('.')[0];

    try {
      let plugins = [defaultDirectivePlugin()];

      if (!pageName.includes("portfolio")) {
        plugins.push(featuredProjectsDirective())
      }

      const markdown = await parsePageMD(page, mdDirPath, plugins);
      const sectionData = markdown.data.sectionOrderData;

      mdMap[pageName] = {
        markdown,
        sectionData
      } as PAGE_MD_DATA;

    } catch (e) {
      console.error(`Failed to read page markdown from file: ${mdDirPath}`)
    }
  };

  return {
    name: 'markdown-preprocessing-alt',
    config(): UserConfig | null | void {
      return {
        define: {
          __MARKDOWN_MAP__: mdMap,
        },
      };
    },
  };
}