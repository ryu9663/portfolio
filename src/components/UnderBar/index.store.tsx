import { create } from 'zustand';

interface UnderbarStoreProps {
  isModalOpen: boolean;
  setIsModalOpen: (isNavOpen: boolean) => void;
}

export const useUnderbarStore = create<UnderbarStoreProps>(set => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
}));
