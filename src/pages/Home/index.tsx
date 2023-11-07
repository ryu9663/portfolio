import { Draggable } from '@/components/Draggable';
import { ICONS } from '@/utils/constant';
import styles from './index.module.scss';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { WindowBox } from '@/components/WindowBox';

export const Home = () => {
  const openedIcon = useWindowBoxStore(state => state.icon);

  return (
    <div className={styles.home}>
      {openedIcon.type !== '' && <WindowBox icon={openedIcon} />}
      <Draggable icons={ICONS} />
    </div>
  );
};
