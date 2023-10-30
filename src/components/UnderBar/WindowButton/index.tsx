import { useNavbarStore } from '@/components/UnderBar/index.store';
import { Button } from 'junyeol-components';
import WindowSVG from '@/assets/window.svg';

interface WindowButton {
  className?: string;
}

export const WindowButton = ({ className }: WindowButton) => {
  const [isNavBarOpen, setIsNavBarOpen] = useNavbarStore(state => [state.isNavBarOpen, state.setIsNavBarOpen]);
  return (
    <>
      <Button onClick={() => setIsNavBarOpen(!isNavBarOpen)} className={className}>
        <img src={WindowSVG} width={40} height={35} alt="window" />
      </Button>
    </>
  );
};
