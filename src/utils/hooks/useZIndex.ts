import { IconFileType, IconFolderType, IconIframeType, OpenableIconType } from '@/components/Icon';
import { OtherWindowType } from '@/components/WindowBox/index.store';
import { findIconByIdWithChildren, flattenAndExtract } from '@/utils';
import { useMountedEffect } from 'junyeol-components';

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
  setWindowState: (
    id: number,
    windows: OpenableIconType[],
    thisWindow: OpenableIconType,
    otherWindow?: OtherWindowType,
    updatedIconsOnUnderbar?: OpenableIconType[],
  ) => void,
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
      const thisWindow = findIconByIdWithChildren(highestZIndexIdInOpenedWindows, windows);
      setWindowState(highestZIndexIdInOpenedWindows, windows, { ...thisWindow, activated: true }, { activated: false });
    }
  }, [highestZIndexIdInOpenedWindows]);
};
