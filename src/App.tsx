import Home from './pages/Home';
import { Header } from 'junyeol-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Carrer from './pages/Carrer';
import WhatIDid from './pages/WhatIDid';
const App = () => (
  <main>
    <Header
      buttons={[
        { link: '/', children: '자기소개' },
        { link: '/carrer', children: '이력' },
        { link: 'whatidid', children: '했던 일' },
      ]}
    />
    <RouterProvider router={router} />
  </main>
);

export default App;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/carrer',
    element: <Carrer />,
  },
  {
    path: '/whatidid',
    element: <WhatIDid />,
  },
]);
