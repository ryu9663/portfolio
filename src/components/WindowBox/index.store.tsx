import { create } from 'zustand';
import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';

interface WindowBoxStoreProps {
  icon: IconType;
  setIcon: (prev: SetStateAction<IconType>) => void;
}
export const useWindowBoxStore = create<WindowBoxStoreProps>(set => ({
  icon: {
    type: '',
    id: 0,
    src: '',
    alt: '',
    left: 0,
    top: 0,
  },
  setIcon: (prev: SetStateAction<IconType>) => {
    prev instanceof Function ? set(state => ({ icon: prev(state.icon) })) : set({ icon: prev });
  },
}));
