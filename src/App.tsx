import { createRef, StrictMode, useEffect, useMemo, useState } from 'react';

import { 
  type LoaderFunctionArgs, 
  createBrowserRouter, 
  Outlet, 
  RouterProvider, 
  useLoaderData, 
  useLocation, 
  ScrollRestoration 
} from 'react-router';

import { useScrollRestorationListener} from '@utils';

import MainLayout from '@layouts/MainLayout';

import Home from '@routes/home';
import Portfolio from '@routes/portfolio';
import Resume from '@routes/resume';

import { RESUME_PATH } from '@utils/Constants';
import type { SectionData, LoaderData, PageDataProps } from '@typing/DataLoading';

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
        },
        {
          path: '/resume',
          element: <Resume />,
        }
      ]
    }
  ]), []);

  return (<RouterProvider router={router} />);
};

export async function appDataLoader(_args: LoaderFunctionArgs) {
  async function loadHomeData(): Promise<LoaderData> {
    try {
      const homeSectionData: SectionData[] = [];
      const pageData = __MARKDOWN_MAP__['home'];
      const markdown = pageData.markdown;
      const sectionData = pageData.sectionData;

      for (const section of sectionData) {
        try {
          homeSectionData.push({
            id: section.id,
            navLabel: section.navLabel,
            ref: createRef(),
          });
        } catch (e) {
          console.log(e)
        }
      }

      return {
        sectionData: homeSectionData,
        markdown: markdown
      }
    } catch (e) {
      console.log(e)
    
      return { sectionData: [], markdown: null };
    }
  } 

  // const loadHomeData = async () => {
  //   try {
  //     const homeSectionData: HomeSectionData[] = [];
  //     const pageData = __MARKDOWN_MAP__['home'];
  //     const markdown = pageData.markdown;
  //     const sectionData = pageData.sectionData;

  //     for (const section of sectionData) {
  //       try {
  //         homeSectionData.push({
  //           id: section.id,
  //           navLabel: section.navLabel,
  //           ref: createRef(),
  //         });
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }

  //     return {
  //       sectionData: homeSectionData,
  //       markdown: markdown
  //     }
  //   } catch (e) {
  //     console.log(e)
  //     return null;
  //   }
  // }

  async function loadPortfolioData(): Promise<LoaderData> {
    try {
      const portfolioSectionData: SectionData[] = [];
      const pageData = __MARKDOWN_MAP__['portfolio'];
      const markdown = pageData.markdown;
      const sectionData = pageData.sectionData;

      for (const section of sectionData) {
        try {
          portfolioSectionData.push({
            id: section.id,
            navLabel: section.navLabel,
            ref: createRef(),
          });
        } catch (e) {
          console.log(e)
        }
      }

      return {
        sectionData: portfolioSectionData,
        markdown: markdown
      }
    } catch (e) {
      console.log(e)
    
      return { sectionData: [], markdown: null };
    }
  } 

  const homeLoaderData = await loadHomeData();
  const portfolioLoaderData = await loadPortfolioData();

  return { homeLoaderData, portfolioLoaderData };
}

function pageStateContainer({ sectionData, markdown }: LoaderData): PageDataProps {
  const [scrollPos, setScrollPos] = useState(0);
  const [sectionState, setSectionState] = useState<string | null>(null)
  const pageData = { sectionData, markdown };

  return { scrollPos, setScrollPos, sectionState, setSectionState, pageData };
}

const AppContent = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector(".Navbar-Container");
    if (!navbar) return;

    const observer = new ResizeObserver(() => {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    });

    useScrollRestorationListener(
      () => {
        document.documentElement.style.scrollBehavior = 'instant';
      },
      () => {
        document.documentElement.style.scrollBehavior = 'auto';
      }
    )

    observer.observe(navbar);
    setNavbarHeight(navbar.getBoundingClientRect().height);

    return () => observer.disconnect();
  }, []);

  const { homeLoaderData, portfolioLoaderData } = useLoaderData();
  const homeProps = pageStateContainer(homeLoaderData);
  const portfolioProps = pageStateContainer(portfolioLoaderData);
  // const portfolioProps = pageStateContainer<HomeSectionData | null>(homeData.sectionData, homeData.markdown);

  // const homeProps = {
  //   homeData, 
  //   scrollPos: homeScrollPos,
  //   setScrollPos: setHomeScrollPos
  // };

  // const portfolioProps = {
  //   portfolioData,
  //   scrollPos: portfolioScrollPos,
  //   setScrollPos: setPortfolioScrollPos
  // }

  const location = useLocation();

  return (
    <MainLayout>
      <Outlet context={{ homeProps, portfolioProps, resumePDFFileURL: RESUME_PATH, navbarHeight }} key={location.pathname}/>
      <ScrollRestoration getKey={(location) => location.pathname} />
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
