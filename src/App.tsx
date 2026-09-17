import { createRef, StrictMode, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, LoaderFunctionArgs, Outlet, RouterProvider, useLoaderData, useLocation } from 'react-router-dom';

import { VFile } from 'vfile';
import matter from 'gray-matter';

import { processMarkdown } from './util/Markdown';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

import layoutJSON from './data/home/layout.json';

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
  const homeSectionOrder: string[] = layoutJSON.sectionOrder;

  const homeSectionData: { id: string, navLabel: string, ref: React.RefObject<HTMLDivElement | null>, markdown: VFile }[] = [];
  const portfolioData = {};

  await Promise.all(homeSectionOrder.map(async (section) => {
      try {
          const sectionMDRaw = await fetch(new URL(`./data/home/markdown/${section}.md`, import.meta.url)).then((response) => response.text());
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

  homeSectionData.sort((a, b) => homeSectionOrder.indexOf(a.id) - homeSectionOrder.indexOf(b.id));

  return { homeSectionData, portfolioData };
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

  const { homeSectionData, portfolioData } = useLoaderData<{
    homeSectionData: {
        id: string;
        navLabel: string;
        ref: React.RefObject<HTMLDivElement | null>;
        markdown: VFile;
    }[];
    portfolioData: {};
  }>();

  const location = useLocation();

  return (
    <MainLayout>
      <Outlet context={{ homeSectionData, portfolioData, navbarHeight }} key={location.pathname}/>
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
