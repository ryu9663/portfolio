import { Underbar } from '@/components/UnderBar';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useUnderbarStore(state => [state.isModalOpen, state.setIsModalOpen]);
  return (
    <>
      <main id="detail" onClick={() => isModalOpen && setIsModalOpen(false)}>
        <Outlet />
      </main>
      {/* <input type="text" /> */}
      {/* <br /> */}
      {/* <span>div</span> */}
      <Underbar />
    </>
  );
};
