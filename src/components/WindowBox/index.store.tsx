import { create } from 'zustand';
import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';
import { devtools } from 'zustand/middleware';

interface WindowBoxStoreProps {
  icons: IconType[];
  setIcons: (prev: SetStateAction<IconType[]>) => void;
}
export const useWindowBoxStore = create<WindowBoxStoreProps>()(
  devtools(
    set => ({
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
    }),
    { name: 'window-storage', enabled: process.env.NODE_ENV !== 'production' },
  ),
);
