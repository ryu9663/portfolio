import { IconFileType, IconFolderType, OpenableIconType } from '@/components/Icon';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';

export const useThisWindowState = (id: number, windows: OpenableIconType[]) => {
  const setWindowState = useWindowBoxStore(state => state.setWindowState);
  return (
    thisWindowState: IconFileType | IconFolderType,
    otherWindowState?: Partial<IconFileType> | Partial<IconFolderType>,
  ) => setWindowState(id, windows, thisWindowState, otherWindowState);
};
