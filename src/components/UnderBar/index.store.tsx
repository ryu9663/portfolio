import { create } from 'zustand';

interface ModalStoreType {
  isModalOpen: boolean;
  setIsModalOpen: (isNavOpen: boolean) => void;
}
export const useModalStore = create<ModalStoreType>(set => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
}));
