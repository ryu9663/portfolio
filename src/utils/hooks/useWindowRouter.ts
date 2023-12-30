import { IconFileType, IconFolderType, OpenableIconType } from '@/components/Icon';
import { OtherWindowType } from '@/components/WindowBox';
import { ICONS } from '@/utils/constant';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const initWindows = ICONS.filter(icon => icon.type === 'folder' || icon.type === 'file') as
  | IconFolderType[]
  | IconFileType[];

export const useWindowRouter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const windows: OpenableIconType[] = parseQueryStringToArray.windows(searchParams.get('windows')) || initWindows;
  const iconsOnUnderbar: OpenableIconType[] =
    parseQueryStringToArray.windows(searchParams.get('icons-on-underbar')) || [];
  const setWindowState = (
    windowsOnWallpapers: {
      id: number;
      windows: OpenableIconType[];
      thisWindow: OpenableIconType;
      otherWindow?: OtherWindowType;
    },
    updatedIconsOnUnderbar?: OpenableIconType[],
  ) => {
    const { id, windows, thisWindow, otherWindow } = windowsOnWallpapers;
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

    setSearchParams({
      windows: serializeArrayToQueryString(updatedWindows),
      'icons-on-underbar': serializeArrayToQueryString(updatedIconsOnUnderbar || iconsOnUnderbar),
    });
  };

  useEffect(() => {
    if (iconsOnUnderbar.length === 0) {
      setSearchParams({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconsOnUnderbar.length]);

  return { windows, iconsOnUnderbar, setWindowState };
};

const parseQueryStringToArray = {
  windows: (queryString: string | null) => {
    try {
      if (typeof queryString === 'string') return JSON.parse(decodeURIComponent(queryString));
    } catch (error) {
      console.error('Error parsing query string:', error);
      return [];
    }
  },
  iconsOnUnderbar: (queryString: string | null) => {
    try {
      if (typeof queryString === 'string') return JSON.parse(decodeURIComponent(queryString));
    } catch (error) {
      console.error('Error parsing query string:', error);
      return [];
    }
  },
};

const serializeArrayToQueryString = (array: OpenableIconType[]) => encodeURIComponent(JSON.stringify(array));
