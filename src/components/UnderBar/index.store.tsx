import { create } from 'zustand';

interface NavStore {
  isNavBarOpen: boolean;
  setIsNavBarOpen: (isNavOpen: boolean) => void;
}
export const useNavbarStore = create<NavStore>(set => ({
  isNavBarOpen: false,
  setIsNavBarOpen: (isNavBarOpen: boolean) => set({ isNavBarOpen }),
}));
