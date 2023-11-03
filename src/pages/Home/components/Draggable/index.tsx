import { Icon } from '@/pages/Home/components/Icon';
import { useState, DragEvent } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/pages/Home/components/Draggable/index.store';

interface DraggableProps {
  icons: {
    id: number;
    src: string;
    alt: string;
    left: number;
    top: number;
  }[];
}

export const Draggable = ({ icons: _icons }: DraggableProps) => {
  const [draggingIcon, setDraggingIcon] = useState<{ id: number } | null>(null);
  const [icons, setIcons] = useState(_icons);
  const isDraggable = useDraggableStore(state => state.isDraggable);
  const handleDragStart = (e: DragEvent, id: number) => {
    if (isDraggable) {
      e.dataTransfer.setData('id', id.toString());
      setDraggingIcon({ id });
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    if (isDraggable) {
      e.preventDefault();
      if (draggingIcon) {
        const id = Number(e.dataTransfer.getData('id'));
        const icon = icons.find(i => i.id === id);
        if (icon) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const updatedIcons = icons.map(i => {
            if (i.id === id) {
              return { ...i, left: x - 30, top: y - 25 };
            }
            return i;
          });

          setIcons(updatedIcons);
        }
        setDraggingIcon(null);
      }
    }
  };

  return (
    <>
      <div
        className={styles.draggable}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onContextMenu={e => {
          e.preventDefault();
        }}
      >
        <div onContextMenu={e => e.stopPropagation()}>
          {icons.map(icon => (
            <Icon key={icon.id} icon={icon} handleDragStart={handleDragStart} />
          ))}
        </div>
      </div>
    </>
  );
};
