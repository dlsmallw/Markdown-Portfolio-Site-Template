import type { LoaderData, PageDataProps, SectionData } from "@typing/data";
import { createRef, useState } from "react";

/**
 * React loader function that retrieves/prepares preprocessed data for use in the web app.
 * @returns     The loaded data.
 */
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

  const loaderDataMap: Record<string, LoaderData> = {};

  for (const route of __ROUTES__) {
    loaderDataMap[route.id] = await loadPageData(route.id);
  }

  return loaderDataMap;
}

/**
 * Generates a state object for a page that is managed from the parent component. 
 * Used specifically for managing scroll position on pages if there are multiple pages for navigating.
 * @param param0    The preprocessed data for the given page.
 * @returns         State variables and setters for managed state. 
 */
export function usePageStateContainer({ sectionData, markdown }: LoaderData): PageDataProps {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [sectionState, setSectionState] = useState<string | null>(null)
  const pageData = { sectionData, markdown };

  return { scrollPos, setScrollPos, sectionState, setSectionState, pageData };
}