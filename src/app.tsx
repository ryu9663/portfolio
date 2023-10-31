import { Underbar } from '@/components/UnderBar';
import { useModalStore } from '@/components/UnderBar/index.store';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useModalStore(state => [state.isModalOpen, state.setIsModalOpen]);
  return (
    <>
      <main id="detail" onClick={() => isModalOpen && setIsModalOpen(false)}>
        <Outlet />
      </main>
      <Underbar />
    </>
  );
};
