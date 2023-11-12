import styles from './index.module.scss';
import { IconType, PrevWindowStateType, WindowState, WindowStateType } from '@/components/Icon';
import { Draggable } from '@/components/Draggable';
import { Button } from 'junyeol-components';
import { useEffect, useMemo, useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { maximizeZIndex as _maximizeZIndex, minimizeWindow } from '@/utils';
import { useUnderbarStore } from '@/components/UnderBar/index.store';

interface WindowBoxProps {
  icon: IconType;
  index: number;
}

export const WindowBox = ({ icon, index }: WindowBoxProps) => {
  const { id, src, alt, left, top, children, windowState } = icon;
  const [isOpen, setIsOpen] = useState(false);
  const newTapPosition = index === 0 ? 1 : index * 30;
  const [openedWindows, setOpenedWindows] = useWindowBoxStore(state => [state.icons, state.setIcons]);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);

  const maximizeZIndex = () => _maximizeZIndex(openedWindows, id, setOpenedWindows);

  useEffect(() => {
    setIsOpen(true);
  }, [id]);

  const onClose = (id: number) => {
    setIsOpen(false);
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
  };

  const setWindowState = (windowState: WindowStateType, prevWindowState?: PrevWindowStateType) => {
    setOpenedWindows(openedWindows =>
      openedWindows.map(icon => (icon.id === id ? { ...icon, windowState, prevWindowState } : icon)),
    );
  };

  const position = useMemo(
    () =>
      (() => {
        if (windowState === WindowState.MAXIMIZED) {
          return { bottom: 0, left: 0, zIndex: icon.zIndex };
        } else if (windowState === WindowState.MINIMIZED) {
          return { bottom: '-100px', left: 100 + index === 0 ? 1 : index * 120 };
        } else if (windowState === WindowState.NORMAL) {
          return { left: 200 + newTapPosition, bottom: 150 + newTapPosition, zIndex: icon.zIndex };
        } else {
          return { left: 0, top: 0 };
        }
      })(),
    [windowState, index, newTapPosition, icon.zIndex],
  );

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
        }}
        onFocus={() => {
          maximizeZIndex();
        }}
        onBlur={() => {
          setOpenedWindows(openedWindows =>
            openedWindows.map(icon => (icon.id === id ? { ...icon, activated: false } : icon)),
          );
        }}
      >
        <header className={styles['windowbox_header']}>
          <ul>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  if (windowState === 'maximized' || windowState === 'normal') setWindowState('minimized', windowState);
                  minimizeWindow(icon.id, setOpenedWindows);
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
                    maximizeZIndex();
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
        <section className={styles['windowbox_body']} onClick={e => e.stopPropagation()}>
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
