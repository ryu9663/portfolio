import { IconFileType, IconFolderType, OpenableIconType } from '@/components/Icon';
import { OtherWindowType, useWindowBoxStore } from '@/components/WindowBox/index.store';

export const useThisWindowState = (id: number, windows: OpenableIconType[]) => {
  const setWindowState = useWindowBoxStore(state => state.setWindowState);
  return (thisWindowState: IconFileType | IconFolderType, otherWindowState?: OtherWindowType) =>
    setWindowState(id, windows, thisWindowState, otherWindowState);
};
