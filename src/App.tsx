import { StrictMode, useMemo } from 'react';
import { appDataLoader, usePageStateContainer } from '@utils/AppLoader';

import { 
  createBrowserRouter, 
  Outlet, 
  RouterProvider, 
  useLoaderData, 
  useLocation, 
  ScrollRestoration, 
  type RouteObject
} from 'react-router';

import { RESUME_PATH } from '@utils/Constants';
import type { LoaderData, PageDataProps, AppDataContextType } from '@typing/DataLoading';

import AppLayout from '@layouts/App';
import { SitePage } from '@components';

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

  const router = useMemo(() => createBrowserRouter([
    {
      element: <AppContent />,
      loader: appDataLoader,
      children: childRoutes
    }
  ]), [childRoutes]);

  return (<RouterProvider router={router} />);
};



const AppContent = () => {
  const pageLoaderDataMap = useLoaderData() as Record<string, LoaderData>;
  const pagePropsMap: Record<string, PageDataProps> = {};

  Object.keys(pageLoaderDataMap).forEach((key) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    pagePropsMap[key] = usePageStateContainer(pageLoaderDataMap[key]);
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
