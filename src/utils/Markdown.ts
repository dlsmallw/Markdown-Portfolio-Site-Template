import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import type { VFile } from 'vfile';
import {unified} from 'unified';

import {visit} from 'unist-util-visit'
import {h} from 'hastscript'
import type {Root} from 'mdast';

/**
 * Converts the markdown from a string to a node tree to be parsed.
 * @param mdStr         The raw markdown as a string.
 * @param plugin        Plugins used for parsing the markdown.
 * @returns             The markdown as a node tree.
 */
async function markdownToNodeTree(mdStr: string, plugin: () =>(tree: Root) => void) {
    return await unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(plugin)
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .process(mdStr);
}

/**
 * A custom plugin used to parse the raw markdown files and associate the correct React element type.
 * @returns     The parsed node tree.
 */
function customDirectivePlugin() {
    return () => {
        return (tree: Root) => {
            visit(tree, (node) => {
                if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
                    const data = node.data || (node.data = {});
                    const attr = node.attributes || {};

                    const hast = h(node.name, attr)

                    data.hName = hast.tagName;
                    data.hProperties = hast.properties;
                }
            });
        };
    }
}

/**
 * Processes a markdown file using the specified directive.
 * @param mdStr     The markdown as a string.
 * @returns         The processed node tree.
 */
async function processMarkdown(mdStr: string): Promise<VFile> {
    return await markdownToNodeTree(mdStr, customDirectivePlugin());
}

export { processMarkdown }