import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';

export const maximizeZIndex = (
  openedWindows: IconType[],
  thisIconId: number,
  setOpenedWindows: (prev: SetStateAction<IconType[]>) => void,
) => {
  const zIndexs = openedWindows.map(icon => icon.zIndex);

  setOpenedWindows(icon =>
    icon.map(icon =>
      icon.id === thisIconId
        ? { ...icon, activated: true, zIndex: Math.max(...zIndexs) + 1 }
        : { ...icon, activated: false },
    ),
  );
};

export const minimizeWindow = (thisIconId: number, setOpenedWindows: (prev: SetStateAction<IconType[]>) => void) => {
  setOpenedWindows(openedWindows =>
    openedWindows.map(i => {
      if (i.id === thisIconId) {
        return { ...i, windowState: 'minimized', activated: false };
      }
      return i;
    }),
  );
};
