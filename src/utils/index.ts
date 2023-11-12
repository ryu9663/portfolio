import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';

export const maximizeZIndex = (
  openedIcons: IconType[],
  thisIconId: number,
  setOpenedIcons: (prev: SetStateAction<IconType[]>) => void,
) => {
  const zIndexs = openedIcons.map(icon => icon.zIndex);

  setOpenedIcons(icon =>
    icon.map(icon =>
      icon.id === thisIconId
        ? { ...icon, activated: true, zIndex: Math.max(...zIndexs) + 1 }
        : { ...icon, activated: false },
    ),
  );
};

export const minimizeWindow = (thisIconId: number, setOpenedIcons: (prev: SetStateAction<IconType[]>) => void) => {
  setOpenedIcons(openedIcons =>
    openedIcons.map(i => {
      if (i.id === thisIconId) {
        return { ...i, windowState: 'minimized', activated: false };
      }
      return i;
    }),
  );
};
