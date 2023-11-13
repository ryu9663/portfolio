import { Draggable } from '@/components/Draggable';
import { ICONS } from '@/utils';
import styles from './index.module.scss';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { WindowBox } from '@/components/WindowBox';
import { useZIndex } from '@/utils/hooks/useZIndex';
import { Fragment } from 'react';

export const Home = () => {
  const [openedWindows, setOpenedWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);

  useZIndex(openedWindows, setOpenedWindows);

  return (
    <div className={styles.home}>
      <Draggable icons={ICONS} />
      {renderIconsRecursively(openedWindows)}
    </div>
  );
};

const renderIconsRecursively = icons =>
  icons.map((icon, i) => {
    if (icon.windowState === 'closed') {
      return null; // windowState가 'closed'인 경우 렌더링하지 않음
    }

    return (
      <Fragment key={i}>
        <WindowBox index={i} icon={icon} />
        {icon.children && icon.children.length > 0 && renderIconsRecursively(icon.children)}
      </Fragment>
    );
  });
