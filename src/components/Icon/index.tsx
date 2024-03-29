import { useRef, useState, DragEvent, Dispatch, SetStateAction } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/components/Draggable/index.store';
import { InfoModal } from '@/components/InfoModal';

import { useWindow } from '@/utils/hooks/useWindow';
import { findIconByIdWithChildren } from '@/utils';
import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

/**
 * @description 'closed' : 언더바에도 없는 상태, 'normal' : 일반 크기로 켜진 상태, 'maximized' : 최대화된 상태, 'minimized' : 최소화된 상태, 언더바에 있음
 */
export const WindowStateType = {
  CLOSED: 'closed',
  NORMAL: 'normal',
  MAXIMIZED: 'maximized',
  MINIMIZED: 'minimized',
} as const;

export const IconType = {
  FOLDER: 'folder',
  FILE: 'file',
  LINK: 'link',
  IFRAME: 'iframe',
} as const;

export type PrevWindowStateType = typeof WindowStateType.NORMAL | typeof WindowStateType.MAXIMIZED;
export type WindowStateType = (typeof WindowStateType)[keyof typeof WindowStateType];
export type OpenableIconType = IconFileType | IconFolderType | IconIframeType;
export interface IconIframeType {
  type: 'iframe';
  windowState: WindowStateType;
  activated?: boolean;
  prevWindowState?: PrevWindowStateType;
  id: number;
  src: string;
  alt: string;
  left: number;
  top: number;
  zIndex: number;
  iframeSrc: string;
}

export interface IconLinkType {
  type: 'link';
  id: number;
  src: string;
  alt: string;
  left: number;
  top: number;
  link: string;
}

export interface IconFileType {
  type: 'file';
  windowState: WindowStateType;
  activated?: boolean;
  prevWindowState?: PrevWindowStateType;
  id: number;
  src: string;
  alt: string;
  left: number;
  top: number;
  zIndex: number;
  markdown: string;
}

export interface IconFolderType {
  type: 'folder';
  windowState: WindowStateType;
  activated?: boolean;
  prevWindowState?: PrevWindowStateType;
  id: number;
  src: string;
  alt: string;
  left: number;
  top: number;
  zIndex: number;
  children?: OpenableIconType[];
}
export type IconType = IconFileType | IconFolderType | IconLinkType | IconIframeType;
export interface IconComponentProps {
  icon: IconType;
  setIcons: Dispatch<SetStateAction<IconType[]>>;
  handleDragStart: (e: DragEvent, id: number) => void;
}

export const Icon = ({ icon, setIcons, handleDragStart }: IconComponentProps) => {
  const isEllipsis = icon.alt.length > 5;
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isRightClick, setIsRightClick] = useState(false);
  const [setMousePosition, isDraggable, setIsDraggable] = useDraggableStore(state => [
    state.setMousePosition,
    state.isDraggable,
    state.setIsDraggable,
  ]);
  const openWindow = useWindow(icon);

  const { windows, iconsOnUnderbar, setWindowState } = useWindowRouter();

  const titleClickCountRef = useRef<number>(0);
  const iconClickCountRef = useRef<number>(0);
  const iconTitleRef = useRef<HTMLTextAreaElement>(null);

  const handleClickToEditIconTitle = (whichClick: 'onTitle' | 'onMenu') => {
    if (whichClick === 'onTitle') {
      titleClickCountRef.current++;
    } else {
      titleClickCountRef.current = 2;
      iconTitleRef.current?.focus();
    }

    if (titleClickCountRef.current === 2) {
      setIsReadOnly(false);
      setIsDraggable(false);

      setTimeout(() => {
        titleClickCountRef.current = 0;
      }, 3000);
    }
  };

  const handleDoubleClickIcon = (icon: IconType) => {
    iconClickCountRef.current++;
    if (iconClickCountRef.current === 2) {
      const isAlreadySameIconOpened = !!iconsOnUnderbar.find(i => i.id === icon.id);
      if (!isAlreadySameIconOpened) {
        openWindow();
      }
    }
    setTimeout(() => {
      iconClickCountRef.current = 0;
    }, 1000);
  };
  return (
    <>
      <div
        draggable={isDraggable}
        className={`${styles.icon} ${styles['priority-2']}`}
        onDragStart={e => handleDragStart(e, icon.id)}
        style={{
          left: icon.left,
          top: icon.top,
        }}
        onMouseDown={e => {
          !isReadOnly && e.stopPropagation();
        }}
        onContextMenu={e => {
          e.preventDefault();
          if (isDraggable && !isRightClick) {
            setIsDraggable(false);
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsRightClick(true);
          }
        }}
        onClick={() => handleDoubleClickIcon(icon)}
      >
        <img src={icon.src} alt={icon.alt} width={30} height={30} />
        <textarea
          ref={iconTitleRef}
          readOnly={isReadOnly}
          className={`${styles.icon_title} ${isReadOnly ? '' : styles.icon_title_edit} ${
            isEllipsis ? styles.ellipsis : ''
          }`}
          onClick={e => {
            e.stopPropagation();
            handleClickToEditIconTitle('onTitle');
          }}
          onFocus={e => {
            !isReadOnly && e.target.select();
          }}
          onBlur={() => {
            if (!isRightClick) {
              setIsReadOnly(true);
              setIsDraggable(true);
              const thisWindow = findIconByIdWithChildren(icon.id, windows);

              setWindowState(
                { id: icon.id, windows, thisWindow: { ...thisWindow, alt: icon.alt } },
                iconsOnUnderbar.map(i => {
                  if (i.id === icon.id) {
                    return { ...i, alt: icon.alt };
                  }
                  return i;
                }),
              );
            }
          }}
          value={icon.alt}
          onChange={e => {
            if (!isReadOnly) {
              if (iconTitleRef.current) {
                iconTitleRef.current.style.height = iconTitleRef.current.scrollHeight + 'px';
              }

              setIcons(prev => {
                const updatedIcons = prev.map(i => {
                  if (i.id === icon.id) {
                    return { ...i, alt: e.target.value };
                  }
                  return i;
                });
                return updatedIcons;
              });
            }
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setIsReadOnly(true);
              setIsDraggable(true);

              if (icon.type === IconType.FOLDER || icon.type === IconType.FILE || icon.type === IconType.IFRAME) {
                const thisWindow = findIconByIdWithChildren(icon.id, windows);
                setWindowState(
                  { id: icon.id, windows, thisWindow: { ...thisWindow, alt: icon.alt } },
                  iconsOnUnderbar.map(i => {
                    if (i.id === icon.id) {
                      return { ...i, alt: icon.alt };
                    }
                    return i;
                  }),
                );
              }
            }

            if (e.key === 'Backspace' && iconTitleRef.current) {
              iconTitleRef.current.style.height = 'auto';
              iconTitleRef.current.style.height = `${iconTitleRef.current.scrollHeight}px`;
            }
          }}
        />
      </div>

      <InfoModal
        isBackdropTransparent
        isOpen={isRightClick && !isDraggable}
        onClose={() => {
          setIsRightClick(false);
          setIsDraggable(true);
        }}
        options={[
          {
            name: icon.alt,
            onClick: () => {
              openWindow();
            },
          },
          {
            name: '이름 변경',
            onClick: () => {
              setIsReadOnly(true);
              titleClickCountRef.current = 2;
              handleClickToEditIconTitle('onMenu');
            },
          },
        ]}
      ></InfoModal>
    </>
  );
};
