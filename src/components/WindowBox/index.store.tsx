import { create } from 'zustand';
import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';

interface WindowBoxStoreProps {
  icons: IconType[];
  setIcons: (prev: SetStateAction<IconType[]>) => void;
}
export const useWindowBoxStore = create<WindowBoxStoreProps>(set => ({
  icons: [
    {
      type: '',
      windowState: 'closed',
      id: 0,
      src: '',
      alt: '',
      left: 0,
      top: 0,
      zIndex: 100,
    },
  ],
  setIcons: (prev: SetStateAction<IconType[]>) => {
    prev instanceof Function ? set(state => ({ icons: prev(state.icons) })) : set({ icons: prev });
  },
}));
