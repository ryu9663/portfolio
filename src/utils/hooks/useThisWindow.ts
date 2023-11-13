import { IconType } from '@/components/Icon';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';

export const useThisWindowState = (id: number, windows: IconType[]) => {
  const setWindowState = useWindowBoxStore(state => state.setWindowState);
  return (thisWindowState: IconType, otherWindowState?: Partial<IconType>) =>
    setWindowState(id, windows, thisWindowState, otherWindowState);
};
