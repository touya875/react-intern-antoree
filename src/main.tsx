import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/layout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BookPage from 'pages/client/book';
import 'styles/global.scss'
import HomePage from 'pages/client/home';
import { App, ConfigProvider } from 'antd';
import { AppProvider } from 'components/context/app.context';
import enUS from 'antd/locale/en_US';
import FavoritePage from './pages/client/favorite';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/book/:id",
        element: <BookPage />,
      },
      {
        path: "/favorite",
        element: <FavoritePage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AppProvider>
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AppProvider>
    </App>
  </StrictMode>,
)
