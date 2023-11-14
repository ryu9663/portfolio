import { useUnderbarStore } from '@/components/UnderBar/index.store';
import styles from './index.module.scss';
import { Button } from 'junyeol-components';
import { InfoModal } from '@/components/InfoModal';
import { IconType, WindowState } from '@/components/Icon';
import { useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useDraggableStore } from '@/components/Draggable/index.store';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';
import { findIconByIdWithChildren, getZIndexesWithChildren } from '@/utils';

export const IconsOnUnderbar = () => {
  const iconsOnUnderbar = useUnderbarStore(state => state.iconsOnUnderbar);

  return (
    <>
      <ul className={styles['window_infoes']}>
        {iconsOnUnderbar.map(icon => (
          <IconOnUnderbar key={icon.id} icon={icon} />
        ))}
      </ul>
    </>
  );
};

const IconOnUnderbar = ({ icon }: { icon: IconType }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);
  const [openedWindows, setOpenedWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);
  const thisIconOnOpened = findIconByIdWithChildren(icon.id, openedWindows) as IconType;
  const setThisWindowState = useThisWindowState(thisIconOnOpened.id, openedWindows);

  const setMousePosition = useDraggableStore(state => state.setMousePosition);
  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const closeWindow = (id: number) => {
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
    setOpenedWindows(openedWindows => openedWindows.filter(icon => icon.id !== id));
  };

  const openWindow = () => {
    const zIndexs = getZIndexesWithChildren(openedWindows);
    setThisWindowState(
      {
        ...thisIconOnOpened,
        windowState: thisIconOnOpened.prevWindowState || 'normal',
        zIndex: Math.max(...zIndexs) + 1,
        activated: true,
      },
      { activated: false },
    );
  };

  const handleClick = (icon: IconType) => {
    const { activated, windowState } = icon;
    if (activated) {
      if (windowState === WindowState.MAXIMIZED || windowState === WindowState.NORMAL) {
        setThisWindowState({
          ...thisIconOnOpened,
          windowState: WindowState.MINIMIZED,
          prevWindowState: windowState,
          activated: false,
        });
      }
    } else {
      if (windowState !== 'minimized') {
        const zIndexs = getZIndexesWithChildren(openedWindows);
        setThisWindowState(
          {
            ...thisIconOnOpened,
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

  return (
    <li data-testid="windowinfo" key={icon.id} style={{ background: thisIconOnOpened.activated ? 'red' : 'blue' }}>
      <Button
        className={styles['window_infoes-button']}
        onContextMenu={e => {
          e.preventDefault();
          setMousePosition({ x: e.clientX, y: e.clientY });
          setIsInfoModalOpen(true);
        }}
        onClick={() => {
          handleClick(thisIconOnOpened);
        }}
      >
        <img src={icon.src} alt={icon.alt} width={30} height={30} /> <span>{icon.alt}</span>
      </Button>
      <InfoModal
        isUpward
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        options={[
          {
            name: `${icon.alt} 열기`,
            onClick: () => {
              console.log('최소화 되어있는거 꺼내기');
            },
          },
          {
            name: '닫기',
            onClick: () => {
              closeWindow(icon.id);
            },
          },
        ]}
      />
    </li>
  );
};
