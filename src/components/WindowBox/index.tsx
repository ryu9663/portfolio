/* eslint-disable react-hooks/exhaustive-deps */
import styles from './index.module.scss';
import { IconFileType, IconFolderType, IconType, OpenableIconType, WindowStateType } from '@/components/Icon';
import { Button } from 'junyeol-components';
import { FocusEventHandler, useMemo, useRef } from 'react';
import { getZIndexesWithChildren, renderWindowbox } from '@/utils';
import { useActivate } from '@/utils/hooks/useActivate';
import { CLASS_OF_ICON_ON_UNDERBAR, UNDERBAR_HEIGHT } from '@/utils/constant';
import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

export type OtherWindowType = Pick<
  Partial<IconFolderType> | Partial<IconFileType>,
  'activated' | 'prevWindowState' | 'windowState' | 'zIndex'
>;

interface WindowBoxProps {
  icon: OpenableIconType;
}

export const WindowBox = ({ icon }: WindowBoxProps) => {
  const { id, windowState } = icon;
  const isOpen = windowState !== WindowStateType.CLOSED;
  const { windows, setWindowState, iconsOnUnderbar } = useWindowRouter();
  const activateRef = useActivate(icon);
  const headerClickCountRef = useRef<number>(0);
  const headerIconClickCountRef = useRef<number>(0);
  const zIndexs = getZIndexesWithChildren(windows);

  const onClose = (id: number) => {
    setWindowState(
      {
        id,
        windows,
        thisWindow: {
          ...icon,
          windowState: WindowStateType.CLOSED,
          activated: false,
        },
      },

      iconsOnUnderbar.filter(icon => icon.id !== id),
    );
  };

  const getIndexOnUnderbar = (id: number, windowsOnUnderbar: IconType[]) =>
    windowsOnUnderbar.findIndex(window => window.id === id);

  const position = useMemo(
    () =>
      (() => {
        const indexOnUnderbar = getIndexOnUnderbar(id, iconsOnUnderbar);

        if (windowState === WindowStateType.MAXIMIZED) {
          return { bottom: `${UNDERBAR_HEIGHT}px`, left: 0, zIndex: icon.zIndex };
        } else if (windowState === WindowStateType.MINIMIZED) {
          return { bottom: `-150px`, left: `${70 + indexOnUnderbar * 120}px` };
        } else if (windowState === WindowStateType.NORMAL) {
          return { left: `${300 + indexOnUnderbar * 120}px`, bottom: 150 + indexOnUnderbar * 30, zIndex: icon.zIndex };
        } else {
          return { left: 0, top: 0 };
        }
      })(),
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

  const handleFocus: FocusEventHandler<HTMLDivElement> = () => {
    setWindowState({
      id,
      windows,
      thisWindow: {
        ...icon,
        activated: true,
        zIndex: Math.max(...zIndexs) + 1,
      },
      otherWindow: {
        activated: false,
      },
    });
  };

  const handleHeaderDoubleClickIcon = (icon: OpenableIconType) => {
    headerClickCountRef.current++;
    if (headerClickCountRef.current === 2) {
      setWindowState({
        id,
        windows,
        thisWindow: {
          ...icon,
          windowState: icon.windowState === WindowStateType.NORMAL ? WindowStateType.MAXIMIZED : WindowStateType.NORMAL,
          activated: true,
          zIndex: Math.max(...zIndexs) + 1,
        },
      });
    }
    setTimeout(() => {
      headerClickCountRef.current = 0;
    }, 1000);
  };

  const handleHeaderIconDoubleClick = (id: OpenableIconType['id']) => {
    headerIconClickCountRef.current++;

    if (headerIconClickCountRef.current === 2) {
      onClose(id);
    }
    setTimeout(() => {
      headerIconClickCountRef.current = 0;
    }, 1000);
  };
  return (
    isOpen && (
      <div
        data-testid="windowbox-testid"
        ref={activateRef}
        tabIndex={0}
        className={`${styles.windowbox} ${windowClassName}`}
        style={{
          ...position,
        }}
        onFocus={handleFocus}
        onBlur={e => {
          if (e.relatedTarget?.className !== CLASS_OF_ICON_ON_UNDERBAR) {
            setWindowState({ id: icon.id, windows, thisWindow: { ...icon, activated: false } });
          }
        }}
      >
        <header onClick={() => handleHeaderDoubleClickIcon(icon)} className={styles['windowbox_header']}>
          <div className={styles['windowbox_header_info']} onClick={e => e.stopPropagation()}>
            <img
              className={styles['windowbox_header_info-img']}
              src={icon.src}
              alt={icon.alt}
              width={25}
              height={25}
              onClick={e => {
                e.stopPropagation();
                handleHeaderIconDoubleClick(icon.id);
              }}
            />
            <span className={styles['windowbox_header_info-title']}>{icon.alt}</span>
          </div>
          <ul
            className={styles['windowbox_header_buttons']}
            onFocus={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            <li>
              <Button
                className={styles.button}
                onClick={() => {
                  if (windowState === WindowStateType.MAXIMIZED || windowState === WindowStateType.NORMAL) {
                    setWindowState({
                      id,
                      windows,
                      thisWindow: {
                        ...icon,
                        windowState: WindowStateType.MINIMIZED,
                        prevWindowState: windowState,
                        activated: false,
                      },
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
                    setWindowState({
                      id,
                      windows,
                      thisWindow: {
                        ...icon,
                        windowState: WindowStateType.MAXIMIZED,
                        prevWindowState: WindowStateType.NORMAL,
                        activated: true,
                        zIndex: Math.max(...zIndexs) + 1,
                      },
                    });
                  } else
                    setWindowState({
                      id,
                      windows,
                      thisWindow: {
                        ...icon,
                        windowState: WindowStateType.NORMAL,
                        prevWindowState: WindowStateType.MAXIMIZED,
                        activated: true,
                        zIndex: Math.max(...zIndexs) + 1,
                      },
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
                  onClose(icon.id);
                }}
              >
                x
              </Button>
            </li>
          </ul>
        </header>
        <section className={`${styles['windowbox_body']} ${styles.scroll}`} onClick={e => e.stopPropagation()}>
          {renderWindowbox(icon, handleFocus)}
        </section>
      </div>
    )
  );
};
