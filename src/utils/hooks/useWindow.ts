import { IconType } from '@/components/Icon';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { getZIndexesWithChildren } from '@/utils';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';
import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

export const useWindow = (icon: IconType) => {
  const { windows } = useWindowRouter();

  const [iconsOnUnderbar, setIconsOnUnderbar] = useUnderbarStore(state => [
    state.iconsOnUnderbar,
    state.setIconsOnUnderbar,
  ]);

  const setThisWindowState = useThisWindowState(icon.id, windows);

  const openWindow = () => {
    const zIndexs = getZIndexesWithChildren(windows);
    if (icon.type === IconType.FOLDER || icon.type === IconType.FILE || icon.type === IconType.IFRAME) {
      setThisWindowState(
        { ...icon, windowState: 'normal', activated: true, zIndex: Math.max(...zIndexs) + 1 },
        { activated: false },
      );
      setIconsOnUnderbar([...iconsOnUnderbar, icon]);
    } else if (icon.type === IconType.LINK) {
      window.open(icon.link);
    }
  };
  return openWindow;
};
