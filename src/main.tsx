import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'junyeol-components/style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Carrer from './pages/Carrer/index.tsx';
import WhatIDid from './pages/WhatIDid/index.tsx';
import { App } from './app.tsx';
import Home from './pages/Home/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/carrer',
        element: <Carrer />,
      },
      {
        path: '/whatidid',
        element: <WhatIDid />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
