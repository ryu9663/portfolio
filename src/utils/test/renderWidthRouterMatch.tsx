import { Underbar } from '@/components/UnderBar';
import { Route, MemoryRouter, Routes } from 'react-router-dom';

export const renderAppWithRouterMatch = (ui: JSX.Element, route: string | string[], path: string) => (
  <MemoryRouter initialEntries={typeof route === 'string' ? [route] : route}>
    <main>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </main>
    <Underbar />
  </MemoryRouter>
);
