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
}

export const Icon = ({ icon, handleDragStart }: IconProps) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [iconTitle, setIconTitle] = useState(icon.alt);

  const countRef = useRef(0);

  setTimeout(() => {
    countRef.current = 0;
  }, 3000);

  return (
    <div
      draggable
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
        size={iconTitle.length}
        className={`${styles.icon_title} ${isReadOnly ? '' : styles.icon_title_edit}`}
        onClick={() => {
          countRef.current++;
          countRef.current === 2 && setIsReadOnly(false);
        }}
        onFocus={e => {
          !isReadOnly && e.target.select();
        }}
        value={iconTitle}
        onChange={e => {
          if (!isReadOnly) {
            setIconTitle(e.target.value);
          }
        }}
      />
    </div>
  );
};
