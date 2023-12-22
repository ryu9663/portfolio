import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/styles/_global.scss';

import 'junyeol-components/style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { App } from './app.tsx';
import { Home } from './pages/Home/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <Home /> }],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
