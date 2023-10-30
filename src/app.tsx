import { Underbar } from '@/components/UnderBar';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <>
    <main id="detail">
      <Outlet />
    </main>
    <Underbar />
  </>
);
