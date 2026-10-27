import { createRef, StrictMode, useMemo, useState } from 'react';

import { 
  type LoaderFunctionArgs, 
  createBrowserRouter, 
  Outlet, 
  RouterProvider, 
  useLoaderData, 
  useLocation, 
  ScrollRestoration, 
  type RouteObject
} from 'react-router';

import { RESUME_PATH } from '@utils/Constants';
import type { SectionData, LoaderData, PageDataProps, AppDataContextType } from '@typing/DataLoading';

import AppLayout from '@layouts/App';
import SitePage, { ResumePage } from '@components/SitePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const RouterLoader = () => {
  const childRoutes = __ROUTES__.map((route) => {
    return {
      index: route.index,
      path: route.pathName,
      element: <SitePage id={route.id} />
    }
  }) as RouteObject[];

  childRoutes.push({
    path: '/resume',
    element: <ResumePage />,
  });

  const router = useMemo(() => createBrowserRouter([
    {
      element: <AppContent />,
      loader: appDataLoader,
      children: childRoutes
    }
  ]), []);

  return (<RouterProvider router={router} />);
};

export async function appDataLoader(_args: LoaderFunctionArgs) {
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

function pageStateContainer({ sectionData, markdown }: LoaderData): PageDataProps {
  const [scrollPos, setScrollPos] = useState(0);
  const [sectionState, setSectionState] = useState<string | null>(null)
  const pageData = { sectionData, markdown };

  return { scrollPos, setScrollPos, sectionState, setSectionState, pageData };
}

const AppContent = () => {
  const pageLoaderDataMap = useLoaderData() as Record<string, LoaderData>;
  const pagePropsMap: Record<string, PageDataProps> = {}

  Object.keys(pageLoaderDataMap).forEach((key, index) => {
    pagePropsMap[key] = pageStateContainer(pageLoaderDataMap[key]);
  });

  const outletContext: AppDataContextType = {
    resumePDFFileURL: RESUME_PATH,
    ...pagePropsMap
  }

  const location = useLocation();

  return (
    <AppLayout>
      <Outlet context={outletContext} key={location.pathname}/>
      <ScrollRestoration getKey={(location) => location.pathname} />
    </AppLayout>
  )
}

function App() {
  return (
    <StrictMode>
      <RouterLoader />
    </StrictMode>
  );
}

export default App;
