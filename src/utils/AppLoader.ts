import type { LoaderData, PageDataProps, SectionData } from "@typing/DataLoading";
import { createRef, useState } from "react";

export async function appDataLoader() {
  async function loadPageData(page: string): Promise<LoaderData> {
    try {
      const pageSectionData: SectionData[] = [];
      const pageData = __MARKDOWN_MAP__[page];
      const markdown = pageData.markdown;
      const sectionData = pageData.sectionData;

      for (const section of sectionData) {
        try {
          pageSectionData.push({
            id: section.id,
            navLabel: section.navLabel,
            ref: createRef(),
          });
        } catch (e) {
          console.log(e)
        }
      }

      return {
        sectionData: pageSectionData,
        markdown: markdown
      }
    } catch (e) {
      console.log(e)
    
      return { sectionData: [], markdown: null };
    }
  }

  const pageLoaderDataMap: Record<string, LoaderData> = {};

  for (const route of __ROUTES__) {
    pageLoaderDataMap[route.id] = await loadPageData(route.id);
  }

  return pageLoaderDataMap;
}

export function usePageStateContainer({ sectionData, markdown }: LoaderData): PageDataProps {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [sectionState, setSectionState] = useState<string | null>(null)
  const pageData = { sectionData, markdown };

  return { scrollPos, setScrollPos, sectionState, setSectionState, pageData };
}