import { create } from 'zustand';
import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';
import { devtools } from 'zustand/middleware';
import { ICONS } from '@/utils';

interface WindowBoxStoreProps {
  windows: IconType[];
  setWindows: (prev: SetStateAction<IconType[]>) => void;
  setWindowState: (id: number, windows: IconType[], thisWindow: IconType, otherWindow?: Partial<IconType>) => void;
}
export const useWindowBoxStore = create<WindowBoxStoreProps>()(
  devtools(
    set => ({
      windows: ICONS,
      setWindows: (prev: SetStateAction<IconType[]>) => {
        prev instanceof Function ? set(state => ({ windows: prev(state.windows) })) : set({ windows: prev });
      },
      // setWindowState: (id: number, windows: IconType[], thisWindow: IconType, otherWindow?: Partial<IconType>) =>
      //   set({
      //     windows: windows.map(window => (window.id === id ? thisWindow : { ...window, ...otherWindow })),
      //   }),
      setWindowState: (id: number, windows: IconType[], thisWindow: IconType, otherWindow?: Partial<IconType>) => {
        const updateWindows = (iconsArray: IconType[]): IconType[] =>
          iconsArray.map(window => {
            if (window.id === id) {
              return thisWindow;
            }
            if (window.children) {
              return {
                ...window,
                children: updateWindows(window.children),
              };
            } else {
              return { ...window, ...otherWindow };
            }
          });

        const updatedIcons = updateWindows(windows);

        set({ windows: updatedIcons });
      },
    }),

    { name: 'window-storage', enabled: process.env.NODE_ENV !== 'production' },
  ),
);
