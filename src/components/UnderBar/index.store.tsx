import { IconType } from '@/components/Icon';
import { create } from 'zustand';

interface UnderbarStoreProps {
  isModalOpen: boolean;
  setIsModalOpen: (isNavOpen: boolean) => void;
  iconsOnUnderbar: IconType[];
  setIconsOnUnderbar: (icon: IconType[]) => void;
}

export const useUnderbarStore = create<UnderbarStoreProps>(set => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  iconsOnUnderbar: [],
  setIconsOnUnderbar: (iconsOnUnderbar: IconType[]) => set({ iconsOnUnderbar }),
}));
