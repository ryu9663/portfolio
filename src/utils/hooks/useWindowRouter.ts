import { IconFileType, IconFolderType, OpenableIconType } from '@/components/Icon';
import { OtherWindowType } from '@/components/WindowBox/index.store';
import { ICONS } from '@/utils/constant';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const initWindows = ICONS.filter(icon => icon.type === 'folder' || icon.type === 'file') as
  | IconFolderType[]
  | IconFileType[];

export const useWindowRouter = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const windows = parseQueryStringToArray.windows(searchParams.get('windows')) || initWindows;
  const setWindowState = (
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
    console.log(updatedWindows);
    setSearchParams({ windows: serializeArrayToQueryString(updatedWindows) });
  };

  useEffect(() => {
    // const dataArray = parseQueryStringToArray.windows(searchParams.get('windows')!);
    // console.log(dataArray);
  }, []);

  return { windows, setWindowState };
};

export const parseQueryStringToArray = {
  windows: (queryString: string | null) => {
    try {
      if (typeof queryString === 'string') return JSON.parse(decodeURIComponent(queryString));
    } catch (error) {
      console.error('Error parsing query string:', error);
      return [];
    }
  },
  // iconsOnUnderbar:
};

const serializeArrayToQueryString = (array: OpenableIconType[]) => encodeURIComponent(JSON.stringify(array));
