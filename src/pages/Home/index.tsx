import { Draggable } from '@/components/Draggable';
import { ICONS } from '@/utils/constant';
import styles from './index.module.scss';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { WindowBox } from '@/components/WindowBox';
import { useZIndex } from '@/utils/hooks/useZIndex';

export const Home = () => {
  const [openedIcons, setOpenedIcons] = useWindowBoxStore(state => [state.icons, state.setIcons]);

  useZIndex(openedIcons, setOpenedIcons);

  return (
    <div className={styles.home}>
      <Draggable icons={ICONS} />
      {openedIcons.map(
        (openedIcon, i) => openedIcon.windowState !== 'closed' && <WindowBox key={i} index={i} icon={openedIcon} />,
      )}
    </div>
  );
};
