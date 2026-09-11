import { StrictMode, useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const RouterLoader = () => {
  const router = useMemo(() => createBrowserRouter([
    {
      path: '',
      element: <AppContent />,
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

const AppContent = () => {
  return (
    <MainLayout>
      <Outlet />
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
