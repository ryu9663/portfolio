import { IconType } from '@/components/Icon';
import { Dispatch, DragEvent, SetStateAction } from 'react';

export const handleDragStart = (
  e: DragEvent,
  id: number,
  isDraggable: boolean,
  setDraggingIcon: Dispatch<
    SetStateAction<{
      id: number;
    } | null>
  >,
) => {
  if (isDraggable) {
    e.dataTransfer.setData('id', id.toString());
    setDraggingIcon({ id });
  }
};

export const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

export const handleDrop = (
  e: DragEvent,
  isDraggable: boolean,
  draggingIcon: { id: number } | null,
  setDraggingIcon: Dispatch<
    SetStateAction<{
      id: number;
    } | null>
  >,
  icons: IconType[],
  setIcons: Dispatch<SetStateAction<IconType[]>>,
) => {
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
