import styles from './index.module.scss';
import { IconType, WindowState } from '@/components/Icon';
import { Draggable } from '@/components/Draggable';
import { Button } from 'junyeol-components';
import { useEffect, useMemo, useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';

interface WindowBoxProps {
  icon: IconType;
  index: number;
}

export const WindowBox = ({ icon, index }: WindowBoxProps) => {
  const { id, src, alt, left, top, children, windowState } = icon;
  const [isOpen, setIsOpen] = useState(false);
  const newTapPosition = index === 0 ? 1 : index * 30;
  const [openedWindows, setOpenedWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);
  const setThisWindowState = useThisWindowState(icon.id, openedWindows);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);
  /** refactor */
  const collectZIndexes = (icons: IconType[]) =>
    icons.reduce<number[]>((zIndexes, icon) => {
      zIndexes.push(icon.zIndex);

      if (icon.children && icon.children.length > 0) {
        zIndexes = zIndexes.concat(collectZIndexes(icon.children));
      }

      return zIndexes;
    }, []);

  const zIndexs = collectZIndexes(openedWindows);

  useEffect(() => {
    setIsOpen(true);
  }, [id]);

  const onClose = (id: number) => {
    setIsOpen(false);
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
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
          setThisWindowState(
            {
              ...icon,
              activated: true,
              zIndex: Math.max(...zIndexs) + 1,
            },
            {
              activated: false,
            },
          );
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
                  if (windowState === WindowState.MAXIMIZED || windowState === WindowState.NORMAL)
                    setThisWindowState({
                      ...icon,
                      windowState: WindowState.MINIMIZED,
                      prevWindowState: windowState,
                      activated: false,
                    });
                }}
              >
                -
              </Button>
            </li>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  if (windowState === WindowState.NORMAL) {
                    setThisWindowState({
                      ...icon,
                      windowState: WindowState.MAXIMIZED,
                      prevWindowState: WindowState.NORMAL,
                    });
                  } else
                    setThisWindowState({
                      ...icon,
                      windowState: WindowState.NORMAL,
                      prevWindowState: WindowState.MAXIMIZED,
                    });
                }}
              >
                +
              </Button>
            </li>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  setThisWindowState({
                    ...icon,
                    windowState: 'closed',
                    prevWindowState: undefined,
                  });
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
