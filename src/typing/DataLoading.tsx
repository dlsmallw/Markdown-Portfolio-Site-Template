import { VFile } from "vfile";

export interface SectionData {
  id: string;
  navLabel?: string; 
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface LoaderData {
  sectionData: SectionData[];
  markdown: VFile;
}
export interface PageDataProps {
  pageData: LoaderData;
  scrollPos: number;
  setScrollPos: React.Dispatch<React.SetStateAction<number>>;
  sectionState?: string;
  setSectionState?: React.Dispatch<React.SetStateAction<string>>;
}

export interface AppDataContextType {
  homeProps: PageDataProps;
  portfolioProps: PageDataProps;
  resumePDFFileURL: string;
}