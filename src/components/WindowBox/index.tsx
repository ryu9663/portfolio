import styles from './index.module.scss';
import { IconType } from '@/components/Icon';
import { Draggable } from '@/components/Draggable';
import { Button } from 'junyeol-components';
import { useEffect, useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { maximizeZIndex as _maximizeZIndex } from '@/utils';
import { useUnderbarStore } from '@/components/UnderBar/index.store';

interface WindowBoxProps {
  icon: IconType;
  index: number;
}

export const WindowBox = ({ icon, index }: WindowBoxProps) => {
  const { id, src, alt, left, top, children, windowState } = icon;
  const [isOpen, setIsOpen] = useState(false);
  const newTapPosition = index === 0 ? 1 : index * 30;
  const [openedIcons, setOpenedIcons] = useWindowBoxStore(state => [state.icons, state.setIcons]);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);

  const maximizeZIndex = (zIndex?: number) => _maximizeZIndex(openedIcons, id, setOpenedIcons, zIndex);

  useEffect(() => {
    setIsOpen(true);
  }, [id]);

  const onClose = (id: number) => {
    setIsOpen(false);
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
  };

  const setWindowState = (windowState: IconType['windowState'], prevWindowState?: IconType['prevWindowState']) => {
    setOpenedIcons(openedIcons =>
      openedIcons.map(icon => (icon.id === id ? { ...icon, windowState, prevWindowState } : icon)),
    );
  };
  console.log(openedIcons);
  const position = (() => {
    if (windowState === 'maximized') {
      return { left: 0, bottom: 0 };
    } else if (windowState === 'minimized') {
      return { bottom: '-100px' };
    } else if (windowState === 'normal') {
      return { left: 200 + newTapPosition, bottom: 100 + newTapPosition, zIndex: icon.zIndex };
    } else {
      return { left: 0, top: 0 };
    }
  })();

  const windowClassName = (() => {
    switch (windowState) {
      case 'maximized':
        return `${styles[windowState]} ${styles['priority-1']}`;
      default:
        return styles[windowState];
    }
  })();

  return (
    isOpen && (
      <div
        tabIndex={0}
        className={`${styles.windowbox} ${windowClassName}`}
        style={{
          ...position,
          transition: 'all 1s',
        }}
        draggable
        onClick={() => maximizeZIndex()}
      >
        <header className={styles['windowbox_header']}>
          <ul>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  if (windowState === 'maximized' || windowState === 'normal') setWindowState('minimized', windowState);
                }}
              >
                -
              </Button>
            </li>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  if (windowState === 'normal') {
                    maximizeZIndex(9999);
                    setWindowState('maximized', 'normal');
                  } else setWindowState('normal', 'maximized');
                }}
              >
                +
              </Button>
            </li>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  setWindowState('closed');
                  onClose(icon.id);
                }}
              >
                x
              </Button>
            </li>
          </ul>
        </header>
        <section className={styles['windowbox_body']}>
          {children ? (
            <Draggable icons={children} />
          ) : (
            <div>
              ({id}, {src}, {alt}, {left}, {top})
            </div>
          )}
        </section>
      </div>
    )
  );
};
