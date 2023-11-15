import { IconType } from '@/components/Icon';
import { flattenAndExtract } from '@/utils';
import { useMountedEffect } from 'junyeol-components';
import { SetStateAction } from 'react';

/**
 *
 * @param openedWindows : window 전체
 * @param setOpenedWindows : setWindow
 * @returns : 아직없음
 */

//! zIndexs 넣고 리팩토링. 리턴값 있어야함.
export const useHighestZIndex = (windows: IconType[], setWindows: (prev: SetStateAction<IconType[]>) => void) => {
  /**
   * 열려있는 것(normal || maximized)중에 zIndex가 제일 높은것 찾는다.
   */
  const highestZIndexIdInOpenedWindows = (() => {
    const openedWindows = flattenAndExtract(windows, window => {
      if (window.windowState !== 'closed' && window.windowState !== 'minimized') {
        return { id: window.id, zIndex: window.zIndex };
      } else return;
    }).filter(Boolean) as { id: number; zIndex: number }[];

    function findHighestZIndexId(arr: { id: number; zIndex: number }[]): number | undefined {
      let highestZIndex = -Infinity;
      let highestZIndexId: number | undefined;

      arr.forEach(el => {
        if (el.zIndex > highestZIndex) {
          highestZIndex = el.zIndex;
          highestZIndexId = el.id;
        }
      });

      return highestZIndexId;
    }

    const highestZIndexId = findHighestZIndexId(openedWindows);
    return highestZIndexId;
  })();

  useMountedEffect(() => {
    if (highestZIndexIdInOpenedWindows) {
      const updateWindow = (windows: IconType[]): IconType[] =>
        windows.map(window => {
          if (window.id === highestZIndexIdInOpenedWindows) {
            return {
              ...window,
              windowState: window.prevWindowState || 'normal',
              activated: true,
              children: window.children ? updateWindow(window.children) : undefined,
            };
          } else
            return {
              ...window,
              children: window.children ? updateWindow(window.children) : undefined,
              activated: false,
            };
        });
      const updatedWindows = updateWindow(windows);

      setWindows(updatedWindows);
    }
  }, [highestZIndexIdInOpenedWindows]);
};
