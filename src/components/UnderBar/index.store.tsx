import { IconType } from '@/components/Icon';
import { create } from 'zustand';

interface UnderbarStoreProps {
  isModalOpen: boolean;
  setIsModalOpen: (isNavOpen: boolean) => void;
  getIndexOnUnderbar: (id: number, windowsOnUnderbar: IconType[]) => number;
}

export const useUnderbarStore = create<UnderbarStoreProps>(set => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  getIndexOnUnderbar: (id: number, windowsOnUnderbar: IconType[]) =>
    windowsOnUnderbar.findIndex(window => window.id === id),
}));
