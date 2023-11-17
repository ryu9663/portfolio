import { Draggable } from '@/components/Draggable';
import { ICONS } from '@/utils/constant';
import styles from './index.module.scss';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { WindowBox } from '@/components/WindowBox';
import { useHighestZIndex } from '@/utils/hooks/useZIndex';
import { Fragment } from 'react';
import { OpenableIconType } from '@/components/Icon';

export const Home = () => {
  const [windows, setWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);

  useHighestZIndex(windows, setWindows);

  return (
    <div className={styles.home}>
      <Draggable icons={ICONS} />
      {renderIconsRecursively(windows)}
    </div>
  );
};

const renderIconsRecursively = (icons: OpenableIconType[]) =>
  icons.map((icon: OpenableIconType) => (
    <Fragment key={icon.id}>
      <WindowBox icon={icon} />
      {icon.type === 'folder' && icon.children && icon.children.length > 0 && renderIconsRecursively(icon.children)}
    </Fragment>
  ));
