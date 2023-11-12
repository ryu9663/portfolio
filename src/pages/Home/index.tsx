import { Draggable } from '@/components/Draggable';
import { ICONS } from '@/utils/constant';
import styles from './index.module.scss';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { WindowBox } from '@/components/WindowBox';
import { useZIndex } from '@/utils/hooks/useZIndex';

export const Home = () => {
  const [openedWindows, setOpenedWindows] = useWindowBoxStore(state => [state.icons, state.setIcons]);

  useZIndex(openedWindows, setOpenedWindows);

  return (
    <div className={styles.home}>
      <Draggable icons={ICONS} />
      {openedWindows.map(
        (openedIcon, i) => openedIcon.windowState !== 'closed' && <WindowBox key={i} index={i} icon={openedIcon} />,
      )}
    </div>
  );
};
