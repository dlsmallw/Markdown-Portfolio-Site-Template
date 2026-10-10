/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface PAGE_MD_DATA {
    sectionData: { id: string; navLabel: string; }[];
    markdown: VFile;
}

declare const __MEDIA_PATH_MAP__: Record<string, string>;
declare const __MARKDOWN_MAP__: Record<string, PAGE_MD_DATA>;