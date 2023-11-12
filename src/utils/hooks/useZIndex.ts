import { IconType } from '@/components/Icon';
import { useMountedEffect } from 'junyeol-components';
import { SetStateAction } from 'react';

/**
 *
 * @param openedIcons
 * @param setOpenedIcons
 * @returns
 */
export const useZIndex = (openedIcons: IconType[], setOpenedIcons: (prev: SetStateAction<IconType[]>) => void) => {
  const openedOnlyOneWindowId = (() => {
    const openedIconIds = openedIcons
      .map(i => {
        if (i.windowState !== 'closed' && i.windowState !== 'minimized') {
          return i.id;
        }
        return;
      })
      .filter(Boolean);
    if (openedIconIds.length === 1) return openedIconIds[0] as number;
    return null;
  })();

  useMountedEffect(() => {
    if (openedOnlyOneWindowId) {
      setOpenedIcons(openedIcons =>
        openedIcons.map(i => {
          if (i.id === openedOnlyOneWindowId) {
            return { ...i, windowState: 'normal', activated: true };
          } else return i;
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedOnlyOneWindowId]);
};
