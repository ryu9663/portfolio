import styles from './index.module.scss';
import { NavBar } from '@/components/UnderBar/NavBar';
import { CurrentTime } from '@/components/UnderBar/CurrentTime';
import { WindowButton } from '@/components/UnderBar/WindowButton';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { Button } from 'junyeol-components';

export const Underbar = () => {
  const iconsOnUnderbar = useUnderbarStore(state => state.iconsOnUnderbar);
  return (
    <>
      <NavBar className={styles['priority-1']} />
      <div className={`${styles.underbar} ${styles['priority-1']}`}>
        <div className={styles['underbar_left']}>
          <WindowButton className={styles['underbar_left_window-button']} />
          <ul className={styles['underbar_left_window-info']}>
            {iconsOnUnderbar.map(icon => (
              <li data-testid="windowinfo" key={icon.id}>
                <Button className={styles['underbar_left_window-info-button']}>
                  <img src={icon.src} alt={icon.alt} width={30} height={30} /> <span>{icon.alt}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <CurrentTime className={styles.underbar_time} />
      </div>
    </>
  );
};
