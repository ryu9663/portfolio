import { create } from 'zustand';
import { IconFileType, IconFolderType, OpenableIconType } from '@/components/Icon';
import { SetStateAction } from 'react';
import { devtools } from 'zustand/middleware';
import { ICONS } from '@/utils/constant';

export type OtherWindowType = Pick<
  Partial<IconFolderType> | Partial<IconFileType>,
  'activated' | 'prevWindowState' | 'windowState' | 'zIndex'
>;

interface WindowBoxStoreProps {
  windows: OpenableIconType[];
  setWindows: (prev: SetStateAction<OpenableIconType[]>) => void;
  setWindowState: (
    id: number,
    windows: OpenableIconType[],
    thisWindow: OpenableIconType,
    otherWindow?: OtherWindowType,
  ) => void;
}

export const useWindowBoxStore = create<WindowBoxStoreProps>()(
  devtools(
    set => ({
      windows: ICONS.filter(icon => icon.type === 'folder' || icon.type === 'file') as
        | IconFolderType[]
        | IconFileType[],

      setWindows: (prev: SetStateAction<OpenableIconType[]>) => {
        prev instanceof Function ? set(state => ({ windows: prev(state.windows) })) : set({ windows: prev });
      },
      setWindowState: (
        id: number,
        windows: OpenableIconType[],
        thisWindow: OpenableIconType,
        otherWindow?: OtherWindowType,
      ) => {
        const updateWindows = (iconsArray: OpenableIconType[]): OpenableIconType[] => {
          const updatedWindows = iconsArray.map((window: OpenableIconType) => {
            if (window.id === id) {
              if (window.type === 'folder' && thisWindow.type === 'folder') {
                return {
                  ...thisWindow,
                  children: window.children ? updateWindows(window.children) : undefined,
                };
              }
              return thisWindow;
            } else if (window.type === 'folder') {
              return {
                ...window,
                children: window.children ? updateWindows(window.children) : undefined,
                ...otherWindow,
              };
            }
            return { ...window, ...otherWindow };
          });

          return updatedWindows;
        };

        const updatedWindows = updateWindows(windows);

        set({ windows: updatedWindows });
      },
    }),

    { name: 'window-storage', enabled: process.env.NODE_ENV !== 'production' },
  ),
);
