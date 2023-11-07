import { useUnderbarStore } from '@/components/UnderBar/index.store';
import styles from './index.module.scss';
import { Button } from 'junyeol-components';

export const IconsOnUnderbar = () => {
  const iconsOnUnderbar = useUnderbarStore(state => state.iconsOnUnderbar);

  return (
    <ul className={styles['window_infoes']}>
      {iconsOnUnderbar.map(icon => (
        <li data-testid="windowinfo" key={icon.id}>
          <Button className={styles['window_infoes-button']}>
            <img src={icon.src} alt={icon.alt} width={30} height={30} /> <span>{icon.alt}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};
