import styles from './index.module.scss';
import { NavBar } from '@/components/UnderBar/NavBar';
import { CurrentTime } from '@/components/UnderBar/CurrentTime';
import { WindowButton } from '@/components/UnderBar/WindowButton';
import { IconsOnUnderbar } from '@/components/UnderBar/IconsOnUnderbar';

export const Underbar = () => (
  <>
    <NavBar className={styles['priority-1']} />
    <div className={`${styles.underbar} ${styles['priority-1']}`}>
      <div className={styles['underbar_left']}>
        <WindowButton className={styles['underbar_left_window-button']} />
        <IconsOnUnderbar />
      </div>

      <CurrentTime className={styles.underbar_time} />
    </div>
  </>
);
