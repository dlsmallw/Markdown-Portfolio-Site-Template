/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface MD_MAP {
    frontmatter: {
        [key: string]: any;
    };
    markdown: VFile;
}

declare const __MEDIA_PATH_MAP__: Record<string, string>;
declare const __MARKDOWN_MAP__: Record<string, Record<string, MD_MAP>>;