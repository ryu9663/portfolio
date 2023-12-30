import { IconType } from '@/components/Icon';
import { getZIndexesWithChildren } from '@/utils';

import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

export const useWindow = (icon: IconType) => {
  const { windows, iconsOnUnderbar, setWindowState } = useWindowRouter();

  const openWindow = () => {
    const zIndexs = getZIndexesWithChildren(windows);
    if (icon.type === IconType.FOLDER || icon.type === IconType.FILE || icon.type === IconType.IFRAME) {
      setWindowState(
        {
          id: icon.id,
          windows,
          thisWindow: { ...icon, windowState: 'normal', activated: true, zIndex: Math.max(...zIndexs) + 1 },
          otherWindow: { activated: false },
        },
        [...iconsOnUnderbar, icon],
      );
    } else if (icon.type === IconType.LINK) {
      window.open(icon.link);
    }
  };
  return openWindow;
};
