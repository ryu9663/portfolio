import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { Button } from 'junyeol-components';
import WindowSVG from '@/assets/window.svg';

interface WindowButton {
  className?: string;
}

export const WindowButton = ({ className }: WindowButton) => {
  const [isModalOpen, setisModalOpen] = useUnderbarStore(state => [state.isModalOpen, state.setIsModalOpen]);
  return (
    <>
      <Button onClick={() => setisModalOpen(!isModalOpen)} className={className}>
        <img src={WindowSVG} width={40} height={35} alt="window" />
      </Button>
    </>
  );
};
