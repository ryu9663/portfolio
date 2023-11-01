import { useRef, useState, DragEvent } from 'react';
import styles from './index.module.scss';

export interface IconProps {
  icon: {
    id: number;
    src: string;
    alt: string;
    left: number;
    top: number;
  };

  handleDragStart: (e: DragEvent, id: number) => void;
  isDraggable: boolean;
  setIsDraggable: (isDraggable: boolean) => void;
}

export const Icon = ({ icon, handleDragStart, isDraggable, setIsDraggable }: IconProps) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [iconTitle, setIconTitle] = useState(icon.alt);

  const countRef = useRef(0);

  const handleEditIconTitle = () => {
    countRef.current++;
    if (countRef.current === 2) {
      setIsReadOnly(false);
      setIsDraggable(false);

      setTimeout(() => {
        countRef.current = 0;
        console.log(countRef.current);
      }, 3000);
    }
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={e => handleDragStart(e, icon.id)}
      style={{
        left: icon.left,
        top: icon.top,
      }}
      className={styles.icon}
      onMouseDown={e => {
        !isReadOnly && e.stopPropagation();
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
  );
};
