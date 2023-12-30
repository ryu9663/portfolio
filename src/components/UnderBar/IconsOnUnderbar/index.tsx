import styles from './index.module.scss';
import { Button } from 'junyeol-components';
import { InfoModal } from '@/components/InfoModal';
import { OpenableIconType, WindowStateType } from '@/components/Icon';
import { useState } from 'react';
import { useDraggableStore } from '@/components/Draggable/index.store';
import { findIconByIdWithChildren, getZIndexesWithChildren } from '@/utils';
import { useWindowRouter } from '@/utils/hooks/useWindowRouter';

export const IconsOnUnderbar = () => {
  const { iconsOnUnderbar } = useWindowRouter();

  return (
    <ul className={styles['window_infoes']}>
      {iconsOnUnderbar.map(icon => (
        <IconOnUnderbar key={icon.id} icon={icon} iconsOnUnderbar={iconsOnUnderbar} />
      ))}
    </ul>
  );
};

const IconOnUnderbar = ({ icon }: { icon: OpenableIconType; iconsOnUnderbar: OpenableIconType[] }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const { windows, iconsOnUnderbar, setWindowState } = useWindowRouter();

  const thisWindow = findIconByIdWithChildren(icon.id, windows);
  const { id } = thisWindow;

  const setMousePosition = useDraggableStore(state => state.setMousePosition);
  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const closeWindow = (id: number) => {
    setWindowState(
      id,
      windows,
      {
        ...icon,
        windowState: WindowStateType.CLOSED,
        activated: false,
      },
      undefined,
      iconsOnUnderbar.filter(icon => icon.id !== id),
    );
  };

  const openWindow = () => {
    const zIndexs = getZIndexesWithChildren(windows);
    setWindowState(
      id,
      windows,
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
        setWindowState(id, windows, {
          ...thisWindow,
          windowState: WindowStateType.MINIMIZED,
          prevWindowState: windowState,
          activated: false,
        });
      }
    } else {
      if (windowState !== WindowStateType.MINIMIZED) {
        const zIndexs = getZIndexesWithChildren(windows);
        setWindowState(
          id,
          windows,
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
    <li data-testid="windowinfo" key={icon.id}>
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
        <img
          src={thisWindow.src}
          className={styles['window_infoes-button_img']}
          alt={thisWindow.alt}
          width={30}
          height={30}
        />

        <span className={styles['window_infoes-button_title']}>{thisWindow.alt}</span>
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
