import { useRef, useState, DragEvent, Dispatch, SetStateAction } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/pages/Home/components/Draggable/index.store';
import { InfoModal } from '@/pages/Home/components/Draggable/components/InfoModal';

export interface IconType {
  type: 'file' | 'folder';
  id: number;
  src: string;
  alt: string;
  left: number;
  top: number;
}
export interface IconComponentProps {
  icon: IconType;
  setIcons: Dispatch<SetStateAction<IconComponentProps['icon'][]>>;
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
  const countRef = useRef(0);
  const iconTitleInpuRef = useRef<HTMLInputElement>(null);

  const handleClickToEditIconTitle = (whichClick: 'onTitle' | 'onMenu') => {
    if (whichClick === 'onTitle') {
      countRef.current++;
    } else {
      countRef.current = 2;
      iconTitleInpuRef.current?.focus();
    }

    if (countRef.current === 2) {
      setIsReadOnly(false);
      setIsDraggable(false);

      setTimeout(() => {
        countRef.current = 0;
      }, 3000);
    }
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
      >
        <img src={icon.src} alt={icon.alt} width={30} height={30} />
        <input
          ref={iconTitleInpuRef}
          type="text"
          readOnly={isReadOnly}
          size={icon.alt.length + 2}
          className={`${styles.icon_title} ${isReadOnly ? '' : styles.icon_title_edit}`}
          onClick={() => handleClickToEditIconTitle('onTitle')}
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
          { name: icon.alt, onClick: () => console.log(icon.alt) },
          {
            name: '이름 변경',
            onClick: () => {
              setIsRightClick(false);
              setIsDraggable(true);
              setIsReadOnly(true);
              countRef.current = 2;
              handleClickToEditIconTitle('onMenu');
              console.log(countRef.current);
            },
          },
          { name: '정보 보기', onClick: () => console.log('정보 보기') },
        ]}
      ></InfoModal>
    </>
  );
};
