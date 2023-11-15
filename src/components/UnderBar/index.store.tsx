import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';
import { create } from 'zustand';

interface UnderbarStoreProps {
  isModalOpen: boolean;
  setIsModalOpen: (isNavOpen: boolean) => void;
  iconsOnUnderbar: IconType[];
  setIconsOnUnderbar: (prev: SetStateAction<IconType[]>) => void;
  getIndexOnUnderbar: (id: number, windowsOnUnderbar: IconType[]) => number;
}

export const useUnderbarStore = create<UnderbarStoreProps>(set => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  iconsOnUnderbar: [],
  setIconsOnUnderbar: (prev: SetStateAction<IconType[]>) => {
    prev instanceof Function
      ? set(state => ({ iconsOnUnderbar: prev(state.iconsOnUnderbar) }))
      : set({ iconsOnUnderbar: prev });
  },
  getIndexOnUnderbar: (id: number, windowsOnUnderbar: IconType[]) =>
    windowsOnUnderbar.findIndex(window => window.id === id),
}));
