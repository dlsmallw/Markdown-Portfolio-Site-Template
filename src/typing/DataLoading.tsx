import { VFile, type DataMap } from "vfile";

/* Custom Extended Types */
export type Data = {
  frontmatter?: Record<string, unknown>;
  sectionOrderData?: SectionData[]
} & Partial<DataMap>;

export interface CustomVFile extends VFile {
  data: Data;
};

/* App Data Structures */
export interface PageMetaData {
  id: string;
  index: boolean;
  pathName: string;
  navLabel: string;
  sectionOrder?: number;
}

export interface SectionData {
  id: string;
  navLabel?: string; 
  ref?: React.RefObject<HTMLDivElement | null>;
}

export interface LoaderData {
  sectionData: SectionData[];
  markdown: VFile | null;
}
export interface PageDataProps {
  pageData: LoaderData;
  scrollPos: number;
  setScrollPos: React.Dispatch<React.SetStateAction<number>>;
  sectionState: string | null;
  setSectionState: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface AppDataContextType {
  resumePDFFileURL: string;
  [key: string]: PageDataProps | string;
  homeProps?: PageDataProps;
  portfolioProps?: PageDataProps;
  
}

/* Markdown Preprocessing Structures */
export interface MARKDOWN_MAP {
  [key: string]: LoaderData;
}

export type SITE_ROUTES = PageMetaData[];