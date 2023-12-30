import { Draggable } from '@/components/Draggable';
import { ICONS } from '@/utils/constant';
import styles from './index.module.scss';
import { WindowBox } from '@/components/WindowBox';
import { useHighestZIndex } from '@/utils/hooks/useZIndex';
import { Fragment } from 'react';
import { OpenableIconType } from '@/components/Icon';
import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

export const Home = () => {
  const { windows, setWindowState } = useWindowRouter();

  useHighestZIndex(windows, setWindowState);
  return (
    <div className={styles.home}>
      <Draggable icons={[...ICONS.filter(i => i.type === 'link'), ...windows]} />
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
