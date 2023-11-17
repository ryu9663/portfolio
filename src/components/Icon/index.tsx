import { useRef, useState, DragEvent, Dispatch, SetStateAction, ReactNode } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/components/Draggable/index.store';
import { InfoModal } from '@/components/InfoModal';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { getZIndexesWithChildren } from '@/utils';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';

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
} as const;

export type PrevWindowStateType = typeof WindowStateType.NORMAL | typeof WindowStateType.MAXIMIZED;
export type WindowStateType = (typeof WindowStateType)[keyof typeof WindowStateType];
export type OpenableIconType = IconFileType | IconFolderType;
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
  content: ReactNode;
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
export type IconType = IconFileType | IconFolderType | IconLinkType;
export interface IconComponentProps {
  icon: IconType;
  setIcons: Dispatch<SetStateAction<IconType[]>>;
  handleDragStart: (e: DragEvent, id: number) => void;
}

export const Icon = ({ icon, setIcons, handleDragStart }: IconComponentProps) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isRightClick, setIsRightClick] = useState(false);
  const [setMousePosition, isDraggable, setIsDraggable] = useDraggableStore(state => [
    state.setMousePosition,
    state.isDraggable,
    state.setIsDraggable,
  ]);

  const [iconsOnUnderbar, setIconsOnUnderbar] = useUnderbarStore(state => [
    state.iconsOnUnderbar,
    state.setIconsOnUnderbar,
  ]);

  const [windows] = useWindowBoxStore(state => [state.windows, state.setWindowState]);
  const setThisWindowState = useThisWindowState(icon.id, windows);

  const titleClickCountRef = useRef(0);
  const iconClickCountRef = useRef(0);
  const iconTitleInpuRef = useRef<HTMLInputElement>(null);

  const handleClickToEditIconTitle = (whichClick: 'onTitle' | 'onMenu') => {
    if (whichClick === 'onTitle') {
      titleClickCountRef.current++;
    } else {
      titleClickCountRef.current = 2;
      iconTitleInpuRef.current?.focus();
    }

    if (titleClickCountRef.current === 2) {
      setIsReadOnly(false);
      setIsDraggable(false);

      setTimeout(() => {
        titleClickCountRef.current = 0;
      }, 3000);
    }
  };

  const openWindow = (icon: IconType) => {
    const zIndexs = getZIndexesWithChildren(windows);
    if (icon.type === IconType.FOLDER || icon.type === IconType.FILE) {
      setThisWindowState(
        { ...icon, windowState: 'normal', activated: true, zIndex: Math.max(...zIndexs) + 1 },
        { activated: false },
      );
    } else if (icon.type === IconType.LINK) {
      console.log('link');
    }
  };

  const handleDoubleClickIcon = (icon: IconType) => {
    iconClickCountRef.current++;
    if (iconClickCountRef.current === 2) {
      const isAlreadySameIconOpened = !!iconsOnUnderbar.find(i => i.id === icon.id);

      if (!isAlreadySameIconOpened) {
        setIconsOnUnderbar([...iconsOnUnderbar, icon]);
        openWindow(icon);
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
        <input
          ref={iconTitleInpuRef}
          type="text"
          readOnly={isReadOnly}
          size={icon.alt.length + 2}
          className={`${styles.icon_title} ${isReadOnly ? '' : styles.icon_title_edit}`}
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
            }
          }}
          value={icon.alt}
          onChange={e => {
            if (!isReadOnly) {
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
              setIsReadOnly(true);
              setIsDraggable(true);
              setIconsOnUnderbar(prev => {
                const updatedIcons = prev.map(i => {
                  if (i.id === icon.id) {
                    return { ...i, alt: icon.alt };
                  }
                  return i;
                });
                return updatedIcons;
              });
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
              openWindow(icon);
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
