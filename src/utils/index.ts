import { IconType } from '@/components/Icon';
import { SetStateAction } from 'react';

export const maximizeZIndex = (
  openedIcons: IconType[],
  thisIconId: number,
  setOpenedIcons: (prev: SetStateAction<IconType[]>) => void,
) => {
  const zIndexs = openedIcons.map(icon => icon.zIndex);

  setOpenedIcons(icon =>
    icon.map(icon => (icon.id === thisIconId ? { ...icon, zIndex: Math.max(...zIndexs) + 1 } : icon)),
  );
};
