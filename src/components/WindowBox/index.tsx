import styles from './index.module.scss';
import { IconType, WindowState } from '@/components/Icon';
import { Draggable } from '@/components/Draggable';
import { Button } from 'junyeol-components';
import { useEffect, useMemo, useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';
import { getZIndexesWithChildren } from '@/utils';
import { useActivate } from '@/utils/hooks/useActivate';

interface WindowBoxProps {
  icon: IconType;
}

export const WindowBox = ({ icon }: WindowBoxProps) => {
  const { id, src, alt, left, top, children, windowState } = icon;
  const [isOpen, setIsOpen] = useState(false);
  const [windows, setWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);
  const setThisWindowState = useThisWindowState(icon.id, windows);
  const activateRef = useActivate(icon);
  const [iconsOnUnderbar, setIconsOnUnderbar, getIndexOnUnderbar] = useUnderbarStore(state => [
    state.iconsOnUnderbar,
    state.setIconsOnUnderbar,
    state.getIndexOnUnderbar,
  ]);
  const zIndexs = getZIndexesWithChildren(windows);

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
        const indexOnUnderbar = getIndexOnUnderbar(id, iconsOnUnderbar);

        if (windowState === WindowState.MAXIMIZED) {
          return { bottom: 0, left: 0, zIndex: icon.zIndex };
        } else if (windowState === WindowState.MINIMIZED) {
          return { bottom: '-100px', left: `${70 + indexOnUnderbar * 120}px` };
        } else if (windowState === WindowState.NORMAL) {
          return { left: `${300 + indexOnUnderbar * 120}px`, bottom: 150 + indexOnUnderbar * 30, zIndex: icon.zIndex };
        } else {
          return { left: 0, top: 0 };
        }
      })(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, iconsOnUnderbar.length, windowState, icon.zIndex],
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
        ref={activateRef}
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
          setWindows(windows => windows.map(icon => (icon.id === id ? { ...icon, activated: false } : icon)));
        }}
      >
        <header className={styles['windowbox_header']}>
          <div className={styles['windowbox_header_info']}>
            <img className={styles['windowbox_header_info-img']} src={icon.src} alt={icon.alt} width={25} height={25} />
            <span className={styles['windowbox_header_info-title']}>{icon.alt}</span>
          </div>
          <ul className={styles['windowbox_header_buttons']}>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  if (windowState === WindowState.MAXIMIZED || windowState === WindowState.NORMAL) {
                    setThisWindowState({
                      ...icon,
                      windowState: WindowState.MINIMIZED,
                      prevWindowState: windowState,
                      activated: false,
                    });
                  }
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
