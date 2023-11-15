import styles from './index.module.scss';
import { NavBar } from '@/components/UnderBar/NavBar';
import { CurrentTime } from '@/components/UnderBar/CurrentTime';
import { WindowButton } from '@/components/UnderBar/WindowButton';
import { IconsOnUnderbar } from '@/components/UnderBar/IconsOnUnderbar';
import { Calendar } from '@/components/UnderBar/Calender';
import { MouseEventHandler, useState } from 'react';

export const Underbar = () => {
  const [isCaledarOpen, setIsCalendarOpen] = useState(false);
  const handleCurrentTimeClick: MouseEventHandler<HTMLDivElement> = () => setIsCalendarOpen(!isCaledarOpen);
  return (
    <>
      <NavBar />
      <Calendar isOpen={isCaledarOpen} />
      <div className={`${styles.underbar} ${styles['priority-0']}`}>
        <div className={styles['underbar_left']}>
          <WindowButton className={styles['underbar_left_window-button']} />
          <IconsOnUnderbar />
        </div>

        <CurrentTime onChange={handleCurrentTimeClick} />
      </div>
    </>
  );
};
