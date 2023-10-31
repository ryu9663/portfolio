import { Draggable } from '@/pages/Home/components/Draggable';
import { ICONS } from '@/utils/constant';
import styles from './index.module.scss';

export const Home = () => (
  <div className={styles.home}>
    <Draggable icons={ICONS} />
  </div>
);
