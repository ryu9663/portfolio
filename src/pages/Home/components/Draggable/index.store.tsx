import { create } from 'zustand';

interface DraggableStoreType {
  mousePosition: { x: number; y: number };
  setMousePosistion: (mousePosition: { x: number; y: number }) => void;
  isDraggable: boolean;
  setIsDraggable: (isDraggable: boolean) => void;
}

export const useDraggableStore = create<DraggableStoreType>(set => ({
  mousePosition: { x: 0, y: 0 },
  setMousePosistion: (mousePosition: { x: number; y: number }) => set({ mousePosition }),
  isDraggable: true,
  setIsDraggable: (isDraggable: boolean) => set({ isDraggable: isDraggable }),
}));
