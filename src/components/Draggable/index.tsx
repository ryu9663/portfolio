import { Icon, IconType } from '@/components/Icon';
import { useState, DragEvent } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/components/Draggable/index.store';
import {
  handleDragStart as _handleDragStart,
  handleDragOver,
  handleDrop as _handleDrop,
} from '@/components/Draggable/handler';

interface DraggableProps {
  icons: IconType[];
}

export const Draggable = ({ icons: _icons }: DraggableProps) => {
  const [draggingIcon, setDraggingIcon] = useState<{ id: number } | null>(null);
  const [icons, setIcons] = useState(_icons);
  const isDraggable = useDraggableStore(state => state.isDraggable);

  const handleDragStart = (e: DragEvent, id: number) => _handleDragStart(e, id, isDraggable, setDraggingIcon);
  const handleDrop = (e: DragEvent) => _handleDrop(e, isDraggable, draggingIcon, setDraggingIcon, icons, setIcons);

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
            <Icon key={icon.id} icon={icon} setIcons={setIcons} handleDragStart={handleDragStart} />
          ))}
        </div>
      </div>
    </>
  );
};
