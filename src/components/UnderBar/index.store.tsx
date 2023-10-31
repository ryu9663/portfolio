import { create } from 'zustand';

interface ModalStore {
  isModalOpen: boolean;
  setIsModalOpen: (isNavOpen: boolean) => void;
}
export const useModalStore = create<ModalStore>(set => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
}));
