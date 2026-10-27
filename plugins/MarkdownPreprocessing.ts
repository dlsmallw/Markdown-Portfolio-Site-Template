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

import type { VFile } from 'vfile';
import { unified } from 'unified';

import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

import type { 
  BlockContent, 
  DefinitionContent, 
  PhrasingContent, 
  Root 
} from 'mdast';

import type{ Data, CustomVFile, LoaderData, MARKDOWN_MAP, SITE_ROUTES, SectionData, PageMetaData } from '@typing/DataLoading';

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

/**
 * A custom plugin used to parse the raw markdown files and associate the correct React element type.
 * @returns     The parsed node tree.
 */
function defaultDirectivePlugin() {
  return () => {
    return (tree: Root, _file?: VFile) => {
      visit(tree, (node, _index, _parent) => {

        if (node.type === 'root') {
          if (node.children.some((child) => 'name' in child && child.name === 'portfolio-block')) {
            let integer = 1;
            node.children.forEach((child) => {
              if ('name' in child && child.name === 'portfolio-block') {
                child.attributes.id = `portfolio-block-${integer}`;
                integer += 1;
              }
            });
          }
        }

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
  const sectionOrderData: SectionData[] = [];

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
        ('children' in node) &&
        (pageLayoutMDVFile.data.frontmatter?.['sectionRoot'])
      ) {
        if (node.name === 'section-ref') {
          node.type = 'containerDirective';
          node.name = 'section-container';

          const textNode = node.children.find((childNode) => childNode.type === 'text' && 'value' in childNode);
          if (textNode) {
            
            const sectionName = textNode.value.split('.')[0];
            const sectionMDVFile = toVFile(textNode.value, resolve(relativePath, pageLayoutMDVFile.data.frontmatter['sectionRoot']));

            const id = `${sectionName}-section`;
            let navLabel = sectionMDVFile.data.frontmatter?.['navLabel'];

            if (!navLabel) {
              navLabel = sectionName.charAt(0).toUpperCase() + sectionName.slice(1).toLowerCase();
            }

            sectionOrderData.push({ id, navLabel });

            const sectionAST = processor.parse(sectionMDVFile).children;

            node.attributes = { ...node.attributes, id, navLabel }
            node.children = sectionAST as (BlockContent | DefinitionContent)[] | PhrasingContent[];
          }
        } else if (node.name === 'load-ref') {
          node.type = 'containerDirective';
          node.name = 'container';

          
          const textNode = node.children.find((childNode) => childNode.type === 'text' && 'value' in childNode);
          const id = textNode.value.split('.')[0];
          if (textNode) {
            
            const mdVFile = toVFile(textNode.value, resolve(relativePath, pageLayoutMDVFile.data.frontmatter['sectionRoot']));
            const sectionAST = processor.parse(mdVFile).children;

            node.attributes = { ...node.attributes, id }
            node.children = sectionAST as (BlockContent | DefinitionContent)[] | PhrasingContent[];
          }
        }
      }
    }
  });

  const processedMD = await parseMDToAST(processor.stringify(cloneTree), plugins) as CustomVFile;

  processedMD.data = {
    sectionOrderData,
    frontmatter: pageLayoutMDVFile.data.frontmatter
  }

  return processedMD;
}

export async function markdownPreprocess(mdDirPath: string) {
  const pages = fs.readdirSync(mdDirPath, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name);

  const mdMap: MARKDOWN_MAP = {};
  const routeList: SITE_ROUTES = [];

  for (const page of pages) {
    const pageName = page.split('.')[0];

    try {
      let plugins = [defaultDirectivePlugin()];

      // if (pageName.includes("portfolio")) {
      //   plugins.push(portfolioPageDirective())
      // }

      const markdown = await parsePageMD(page, mdDirPath, plugins);
      const frontmatter = markdown.data.frontmatter;
      const sectionData = markdown.data.sectionOrderData;

      const isIndex = frontmatter['index'] ?? false;
      const path = frontmatter['pathName'] ?? (isIndex ? '/' : `/${pageName}`);

      mdMap[pageName] = {
        markdown,
        sectionData
      } as LoaderData;

      const metaData: PageMetaData = {
        id: pageName,
        index: isIndex,
        pathName: path,
        navLabel: frontmatter['navLabel'] ?? pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase(),
        sectionOrder: frontmatter['sectionOrder']
      }

      routeList.push(metaData);

    } catch (e) {
      console.error(`Failed to read page markdown from file: ${mdDirPath}`)
    }
  }

  const sortedRouteList = [...routeList].sort((a, b) => {
    return (
      (+b.index - +a.index) ||
      ((b.sectionOrder ?? 0) - (a.sectionOrder ?? 0))
    )
  });

  return {
    name: 'markdown-preprocessing',
    config(): UserConfig | null | void {
      return {
        define: {
          __MARKDOWN_MAP__: mdMap,
          __ROUTES__: sortedRouteList
        },
      };
    },
  };
}