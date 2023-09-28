import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'junyeol-components/style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Carrer from './pages/Carrer/index.tsx';
import WhatIDid from './pages/WhatIDid/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
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
