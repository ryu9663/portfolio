import { useRef, useState, DragEvent, memo } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/pages/Home/components/Draggable/index.store';
import { InfoModal } from '@/pages/Home/components/Draggable/components/InfoModal';

export interface IconProps {
  icon: {
    id: number;
    src: string;
    alt: string;
    left: number;
    top: number;
  };

  handleDragStart: (e: DragEvent, id: number) => void;
}

export const Icon = memo(
  ({ icon, handleDragStart }: IconProps) => {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [iconTitle, setIconTitle] = useState(icon.alt);
    const [isRightClick, setIsRightClick] = useState(false);
    const [setMousePosition, isDraggable, setIsDraggable] = useDraggableStore(state => [
      state.setMousePosition,
      state.isDraggable,
      state.setIsDraggable,
    ]);
    const countRef = useRef(0);

    const handleEditIconTitle = () => {
      countRef.current++;
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
            console.log(icon.alt, isDraggable, isRightClick);
            if (isDraggable && !isRightClick) {
              console.log('hihi');
              setIsDraggable(false);
              setMousePosition({ x: e.clientX, y: e.clientY });
              setIsRightClick(true);
            }
          }}
        >
          <img src={icon.src} alt={icon.alt} width={30} height={30} />
          <input
            type="text"
            readOnly={isReadOnly}
            size={iconTitle.length + 2}
            className={`${styles.icon_title} ${isReadOnly ? '' : styles.icon_title_edit}`}
            onClick={() => handleEditIconTitle()}
            onFocus={e => {
              !isReadOnly && e.target.select();
            }}
            onBlur={() => {
              setIsReadOnly(true);
              setIsDraggable(true);
            }}
            value={iconTitle}
            onChange={e => {
              if (!isReadOnly) {
                setIconTitle(e.target.value);
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
          isOpen={isRightClick && !isDraggable}
          onClose={() => {
            setIsRightClick(false);
          }}
          options={[
            { name: icon.alt, onClick: () => console.log(icon.alt) },
            { name: '이름 변경', onClick: () => console.log('이름 변경') },
            { name: '정보 보기', onClick: () => console.log('정보 보기') },
          ]}
        ></InfoModal>
      </>
    );
  },
  (prev, next) => {
    const isSamePosition = prev.icon.left === next.icon.left && prev.icon.top === next.icon.top;
    return isSamePosition;
  },
);
