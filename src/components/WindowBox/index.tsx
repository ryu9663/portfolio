import styles from './index.module.scss';
import { IconFileType, IconFolderType, WindowStateType } from '@/components/Icon';
import { Draggable } from '@/components/Draggable';
import { Button } from 'junyeol-components';
import { useMemo } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';
import { getZIndexesWithChildren } from '@/utils';
import { useActivate } from '@/utils/hooks/useActivate';
import { CLASS_OF_ICON_ON_UNDERBAR } from '@/utils/constant';
import { Markdown } from '@/components/Markdown';

interface WindowBoxProps {
  icon: IconFileType | IconFolderType;
}

export const WindowBox = ({ icon }: WindowBoxProps) => {
  const { type, id, windowState } = icon;
  const isOpen = windowState !== WindowStateType.CLOSED;
  const [windows, setWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);
  const setThisWindowState = useThisWindowState(icon.id, windows);
  const activateRef = useActivate(icon);
  const [iconsOnUnderbar, setIconsOnUnderbar, getIndexOnUnderbar] = useUnderbarStore(state => [
    state.iconsOnUnderbar,
    state.setIconsOnUnderbar,
    state.getIndexOnUnderbar,
  ]);
  const zIndexs = getZIndexesWithChildren(windows);

  const onClose = (id: number) => {
    setThisWindowState({
      ...icon,
      windowState: WindowStateType.CLOSED,
    });
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
  };

  const position = useMemo(
    () =>
      (() => {
        const indexOnUnderbar = getIndexOnUnderbar(id, iconsOnUnderbar);

        if (windowState === WindowStateType.MAXIMIZED) {
          return { bottom: 0, left: 0, zIndex: icon.zIndex };
        } else if (windowState === WindowStateType.MINIMIZED) {
          return { bottom: '-100px', left: `${70 + indexOnUnderbar * 120}px` };
        } else if (windowState === WindowStateType.NORMAL) {
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
      case (WindowStateType.MAXIMIZED, WindowStateType.MINIMIZED):
        return `${styles[windowState]} ${styles['priority-0']}`;
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
        onBlur={e => {
          if (e.relatedTarget?.className !== CLASS_OF_ICON_ON_UNDERBAR) {
            setWindows(windows => windows.map(icon => (icon.id === id ? { ...icon, activated: false } : icon)));
          }
        }}
      >
        <header className={styles['windowbox_header']}>
          <div className={styles['windowbox_header_info']}>
            <img className={styles['windowbox_header_info-img']} src={icon.src} alt={icon.alt} width={25} height={25} />
            <span className={styles['windowbox_header_info-title']}>{icon.alt}</span>
          </div>
          <ul className={styles['windowbox_header_buttons']} onFocus={e => e.stopPropagation()}>
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  if (windowState === WindowStateType.MAXIMIZED || windowState === WindowStateType.NORMAL) {
                    setThisWindowState({
                      ...icon,
                      windowState: WindowStateType.MINIMIZED,
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
                  if (windowState === WindowStateType.NORMAL) {
                    setThisWindowState({
                      ...icon,
                      windowState: WindowStateType.MAXIMIZED,
                      prevWindowState: WindowStateType.NORMAL,
                      activated: true,
                      zIndex: Math.max(...zIndexs) + 1,
                    });
                  } else
                    setThisWindowState({
                      ...icon,
                      windowState: WindowStateType.NORMAL,
                      prevWindowState: WindowStateType.MAXIMIZED,
                      activated: true,
                      zIndex: Math.max(...zIndexs) + 1,
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
        <section className={`${styles['windowbox_body']} ${styles.scroll}`} onClick={e => e.stopPropagation()}>
          {type === 'folder' && icon.children ? (
            <Draggable icons={icon.children} />
          ) : (
            <>
              <Markdown markdown={(icon as IconFileType).markdown} />
            </>
          )}
        </section>
      </div>
    )
  );
};
