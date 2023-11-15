import { useMemo } from 'react';
import styles from './index.module.scss';
import ReactCalender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

interface CalenderProps {
  isOpen: boolean;
}
export const Calendar = ({ isOpen }: CalenderProps) => {
  const MemoizedCalender = useMemo(
    () => (
      <ReactCalender
        className={`${styles.calendar} ${isOpen ? styles.isOpen : ''} ${styles['priority-2']}`}
        value={new Date()}
        calendarType={'gregory'}
        minDetail={'month'}
      ></ReactCalender>
    ),
    [isOpen],
  );
  return <div className={styles.calendar}>{MemoizedCalender}</div>;
};
