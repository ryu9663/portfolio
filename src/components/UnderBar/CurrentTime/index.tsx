import { useCurrentTime } from '@/utils/hooks/useCurrentTime';
import styles from './index.module.scss';
import { MouseEventHandler } from 'react';

interface CurrentTimeProps {
  onChange: MouseEventHandler<HTMLDivElement>;
}
export const CurrentTime = ({ onChange }: CurrentTimeProps) => {
  const currentTime = useCurrentTime();

  return (
    <div className={styles.relative}>
      <div onClick={onChange} className={styles.current_time}>
        {currentTime}
      </div>
    </div>
  );
};
