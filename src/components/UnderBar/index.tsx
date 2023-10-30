import styles from './index.module.scss';
import { NavBar } from '@/components/UnderBar/NavBar';
import { CurrentTime } from '@/components/UnderBar/CurrentTime';
import { WindowButton } from '@/components/UnderBar/WindowButton';

export const Underbar = () => (
  <>
    <NavBar className={styles['priority-1']} />
    <div className={`${styles.underbar} ${styles['priority-1']}`}>
      <WindowButton className={styles['underbar_window-button']} />
      <CurrentTime className={styles.underbar_time} />
    </div>
  </>
);
