import { createRef, StrictMode, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, type LoaderFunctionArgs, Outlet, RouterProvider, useLoaderData, useLocation } from 'react-router';

import matter from 'gray-matter';

import { processMarkdown } from './util/Markdown';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';



import { 
  MD_PATH,
  DEFAULT_MD_PATH 
} from './config';


import type { 
  HomeSectionData,
  HomeLoaderData,
  PortfolioSectionData,
  PortfolioLoaderData,
  AppDataContextType
} from './types/DataLoading';

import homeLayoutJSON from './static/markdown/home/layout.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const RouterLoader = () => {
  const router = useMemo(() => createBrowserRouter([
    {
      path: '',
      element: <AppContent />,
      loader: appDataLoader,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/portfolio',
          element: <Portfolio />,
        }
      ]
    }
  ]), []);

  return (<RouterProvider router={router} />);
};

export async function appDataLoader(_args: LoaderFunctionArgs) {
  const loadHomeData = async (sectionOrder: string[], fp: string) => {
    try {
      const homeSectionData: HomeSectionData[] = [];

      await Promise.all(sectionOrder.map(async (section) => {
          try {
              const sectionMDRaw = await fetch(new URL(`${fp}/home/${section}.md`, import.meta.url)).then((response) => response.text());
              const { data, content } = matter(sectionMDRaw);
              const sectionMarkdown = await processMarkdown(String(content));

              homeSectionData.push({
                  id: section,
                  navLabel: data.navLabel,
                  ref: createRef(),
                  markdown: sectionMarkdown
              });
          } catch (e) {
              console.log(e)
          }
      }));

      homeSectionData.sort((a, b) => sectionOrder.indexOf(a.id) - sectionOrder.indexOf(b.id));

      return {
        sectionOrder: sectionOrder,
        sectionData: homeSectionData
      }
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  const loadPortfolioData = async () => {
    return null;
  }

  

  const homeData: HomeLoaderData | null = await loadHomeData(homeLayoutJSON.sectionOrder, DEFAULT_MD_PATH);
  const portfolioData: PortfolioLoaderData | null = await loadPortfolioData();

  return { homeData, portfolioData };
}

const AppContent = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector(".Navbar-Container");
    if (!navbar) return;

    const observer = new ResizeObserver(() => {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    });

    observer.observe(navbar);
    setNavbarHeight(navbar.getBoundingClientRect().height);

    return () => observer.disconnect();
  }, []);

  const { homeData, portfolioData } = useLoaderData<AppDataContextType>();
  const location = useLocation();

  return (
    <MainLayout>
      <Outlet context={{ homeData, portfolioData, navbarHeight }} key={location.pathname}/>
    </MainLayout>
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
