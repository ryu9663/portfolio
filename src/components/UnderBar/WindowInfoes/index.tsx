import { useUnderbarStore } from '@/components/UnderBar/index.store';
import styles from '../index.module.scss';
import { Button } from 'junyeol-components';

export const WindowInfoes = () => {
  const iconsOnUnderbar = useUnderbarStore(state => state.iconsOnUnderbar);
  return (
    <ul className={styles['underbar_left_window-info']}>
      {iconsOnUnderbar.map(icon => (
        <li data-testid="windowinfo" key={icon.id}>
          <Button className={styles['underbar_left_window-info-button']}>
            <img src={icon.src} alt={icon.alt} width={30} height={30} /> <span>{icon.alt}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};
