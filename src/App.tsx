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

import type { 
  HomeSectionData,
  HomeLoaderData,
  PortfolioSectionData,
  PortfolioLoaderData,
} from '@typing/DataLoading';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { RESUME_PATH } from '@utils/Constants';



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
  const loadHomeData = async () => {
    try {
      const homeSectionData: HomeSectionData[] = [];
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
      return null;
    }
  }

  const loadPortfolioData = async () => {
    return null;
  }

  const homeData: HomeLoaderData | null = await loadHomeData();
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

  const { homeData, homeDataAlt, portfolioData } = useLoaderData();
  console.log(homeDataAlt)
  const location = useLocation();

  return (
    <MainLayout>
      <Outlet context={{ homeData, portfolioData, resumePDFFileURL: RESUME_PATH, navbarHeight }} key={location.pathname}/>
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
