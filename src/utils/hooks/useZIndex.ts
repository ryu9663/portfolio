import { IconType } from '@/components/Icon';
import { useMountedEffect } from 'junyeol-components';
import { SetStateAction } from 'react';

/**
 *
 * @param openedWindows
 * @param setOpenedWindows
 * @returns
 */

//! zIndexs 넣고 리팩토링. 리턴값 있어야함.
export const useZIndex = (openedWindows: IconType[], setOpenedWindows: (prev: SetStateAction<IconType[]>) => void) => {
  const openedOnlyOneWindowId = (() => {
    const openedIconIds = openedWindows
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
      setOpenedWindows(openedWindows =>
        openedWindows.map(i => {
          if (i.id === openedOnlyOneWindowId) {
            return { ...i, windowState: 'normal', activated: true };
          } else return i;
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedOnlyOneWindowId]);
};
