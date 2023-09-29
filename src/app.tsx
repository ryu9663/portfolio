import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';

export const App = () => (
  <>
    <Header />
    <main id="detail">
      <Outlet />
    </main>
  </>
);
