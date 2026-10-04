import { VFile } from "vfile";

export interface HomeSectionData {
  id: string;
  navLabel: string; 
  ref: React.RefObject<HTMLDivElement | null>;
  markdown: VFile | string;
};

export interface HomeLoaderData {
  sectionOrder: string[];
  sectionData: HomeSectionData[];
};

export interface PortfolioSectionData {
    [key: string]: any;
};

export interface PortfolioLoaderData {
    sectionOrder: string[];
    sectionData: PortfolioSectionData[]
};

export interface AppDataContextType {
    homeData: HomeLoaderData;
    portfolioData: PortfolioLoaderData | {};
    resumePDFFileURL: string;
    navbarHeight: number;
};