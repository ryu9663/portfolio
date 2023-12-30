import { OpenableIconType } from '@/components/Icon';
import { OtherWindowType } from '@/components/WindowBox/index.store';
import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

export const useThisWindowState = (id: number, windows: OpenableIconType[]) => {
  const { setWindowState } = useWindowRouter();

  return (thisWindowState: OpenableIconType, otherWindowState?: OtherWindowType) =>
    setWindowState(id, windows, thisWindowState, otherWindowState);
};
