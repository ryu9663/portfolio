import { useUnderbarStore } from '@/components/UnderBar/index.store';
import styles from './index.module.scss';
import { Button } from 'junyeol-components';
import { InfoModal } from '@/components/InfoModal';
import { OpenableIconType, WindowStateType } from '@/components/Icon';
import { useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useDraggableStore } from '@/components/Draggable/index.store';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';
import { findIconByIdWithChildren, getZIndexesWithChildren } from '@/utils';

export const IconsOnUnderbar = () => {
  const iconsOnUnderbar = useUnderbarStore(state => state.iconsOnUnderbar);

  return (
    <ul className={styles['window_infoes']}>
      {iconsOnUnderbar.map(icon => icon.type !== 'link' && <IconOnUnderbar key={icon.id} icon={icon} />)}
    </ul>
  );
};

const IconOnUnderbar = ({ icon }: { icon: Pick<OpenableIconType, 'id'> }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);
  const [windows, setWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);
  const thisWindow = findIconByIdWithChildren(icon.id, windows);
  const setThisWindowState = useThisWindowState(thisWindow.id, windows);

  const setMousePosition = useDraggableStore(state => state.setMousePosition);
  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const closeWindow = (id: number) => {
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
    setWindows(windows => windows.filter(window => window.id !== id));
  };

  const openWindow = () => {
    const zIndexs = getZIndexesWithChildren(windows);
    setThisWindowState(
      {
        ...thisWindow,
        windowState: thisWindow.prevWindowState || 'normal',
        zIndex: Math.max(...zIndexs) + 1,
        activated: true,
      },
      { activated: false },
    );
  };

  const handleClick = (window: OpenableIconType) => {
    const { activated, windowState } = window;
    if (activated) {
      if (windowState === WindowStateType.MAXIMIZED || windowState === WindowStateType.NORMAL) {
        setThisWindowState({
          ...thisWindow,
          windowState: WindowStateType.MINIMIZED,
          prevWindowState: windowState,
          activated: false,
        });
      }
    } else {
      if (windowState !== WindowStateType.MINIMIZED) {
        const zIndexs = getZIndexesWithChildren(windows);
        setThisWindowState(
          {
            ...thisWindow,
            zIndex: Math.max(...zIndexs) + 1,
            activated: true,
          },
          { activated: false },
        );
      }

      if (windowState === 'minimized') {
        openWindow();
      }
    }
  };

  const openOrMinimizOrActivate = (() => {
    if (thisWindow.windowState === WindowStateType.MINIMIZED) {
      return '열기';
    } else if (thisWindow.activated) {
      return '최소화';
    } else return '맨 위로 보기';
  })();

  return (
    <li data-testid="windowinfo" key={thisWindow.id} style={{ background: thisWindow.activated ? 'red' : 'blue' }}>
      <Button
        className={styles['window_infoes-button']}
        onContextMenu={e => {
          e.preventDefault();
          setMousePosition({ x: e.clientX, y: e.clientY });
          setIsInfoModalOpen(true);
        }}
        onClick={() => {
          handleClick(thisWindow);
        }}
      >
        <img src={thisWindow.src} alt={thisWindow.alt} width={30} height={30} /> <span>{thisWindow.alt}</span>
      </Button>
      <InfoModal
        isUpward
        isBackdropTransparent
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        options={[
          {
            name: `${thisWindow.alt} ${openOrMinimizOrActivate}`,
            onClick: () => {
              handleClick(thisWindow);
            },
          },
          {
            name: '닫기',
            onClick: () => {
              closeWindow(thisWindow.id);
            },
          },
        ]}
      />
    </li>
  );
};
