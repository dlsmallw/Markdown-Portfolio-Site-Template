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

function sectionDirectivePlugin() {
    return () => {
        return (tree: Root) => {
            visit(tree, (node) => {
                if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
                    if (node.type === 'textDirective') {
                        console.log(node)
                    }
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

async function processMarkdown(mdStr: string): Promise<VFile> {
    return await markdownToNodeTree(mdStr, sectionDirectivePlugin());
}

export { processMarkdown }