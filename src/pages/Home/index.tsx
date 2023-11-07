import { Draggable } from '@/components/Draggable';
import { ICONS } from '@/utils/constant';
import styles from './index.module.scss';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { WindowBox } from '@/components/WindowBox';

export const Home = () => {
  const openedIcons = useWindowBoxStore(state => state.icons);

  return (
    <div className={styles.home}>
      <Draggable icons={ICONS} />
      {openedIcons.map((openedIcon, i) => openedIcon.type !== '' && <WindowBox key={i} index={i} icon={openedIcon} />)}
    </div>
  );
};
