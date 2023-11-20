import { IconFileType, IconFolderType, IconIframeType, OpenableIconType } from '@/components/Icon';
import { flattenAndExtract } from '@/utils';
import { useMountedEffect } from 'junyeol-components';
import { SetStateAction } from 'react';

/** SUGAR type */
interface FileWithChildrenType extends IconFileType {
  children?: undefined;
}

interface IframeWithChildrenType extends IconIframeType {
  children?: undefined;
}

type AlwaysHaveChildrenType = IconFolderType | FileWithChildrenType | IframeWithChildrenType;

/**
 *
 * @param openedWindows : window 전체
 * @param setOpenedWindows : setWindow
 * @returns : 아직없음
 */

//! zIndexs 넣고 리팩토링. 리턴값 있어야함.
export const useHighestZIndex = (
  windows: OpenableIconType[],
  setWindows: (prev: SetStateAction<OpenableIconType[]>) => void,
) => {
  /**
   * 열려있는 것(normal || maximized)중에 zIndex가 제일 높은것 찾는다.
   */
  const highestZIndexIdInOpenedWindows = (() => {
    const openedWindows = flattenAndExtract(windows as AlwaysHaveChildrenType[], window => {
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
      const updateWindow = (windows: OpenableIconType[]): OpenableIconType[] =>
        windows.map(window => {
          if (window.id === highestZIndexIdInOpenedWindows) {
            if (window.type === 'folder') {
              return {
                ...window,
                children: window.children ? updateWindow(window.children) : undefined,
                activated: true,
              };
            } else return { ...window, activated: true };
          } else if (window.type === 'folder') {
            return {
              ...window,
              children: window.children ? updateWindow(window.children) : undefined,
              activated: false,
            };
          } else return { ...window, activated: false };
        });
      const updatedWindows = updateWindow(windows);

      setWindows(updatedWindows);
    }
  }, [highestZIndexIdInOpenedWindows]);
};
