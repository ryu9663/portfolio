import { IconType } from '@/components/Icon';
import { getZIndexesWithChildren } from '@/utils';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';
import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

export const useWindow = (icon: IconType) => {
  const { windows, iconsOnUnderbar } = useWindowRouter();

  const setThisWindowState = useThisWindowState(icon.id, windows);

  const openWindow = () => {
    const zIndexs = getZIndexesWithChildren(windows);
    if (icon.type === IconType.FOLDER || icon.type === IconType.FILE || icon.type === IconType.IFRAME) {
      setThisWindowState(
        { ...icon, windowState: 'normal', activated: true, zIndex: Math.max(...zIndexs) + 1 },
        { activated: false },
        [...iconsOnUnderbar, icon],
      );
    } else if (icon.type === IconType.LINK) {
      window.open(icon.link);
    }
  };
  return openWindow;
};
