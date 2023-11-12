import { useUnderbarStore } from '@/components/UnderBar/index.store';
import styles from './index.module.scss';
import { Button } from 'junyeol-components';
import { InfoModal } from '@/components/InfoModal';
import { IconType } from '@/components/Icon';
import { useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useDraggableStore } from '@/components/Draggable/index.store';
import { maximizeZIndex, minimizeWindow } from '@/utils';

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
  const [openedIcons, setOpenedIcons] = useWindowBoxStore(state => [state.icons, state.setIcons]);
  const thisIconOnOpened = openedIcons.find(i => i.id === icon.id)!;
  const setMousePosition = useDraggableStore(state => state.setMousePosition);
  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const closeWindow = (id: number) => {
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
    setOpenedIcons(openedIcons => openedIcons.filter(icon => icon.id !== id));
  };

  const openWindow = (id: number) => {
    setOpenedIcons(openedIcons =>
      openedIcons.map(i => {
        if (i.id === id) {
          return { ...i, windowState: i.prevWindowState || 'normal' };
        }
        return { ...i, activated: false };
      }),
    );
    maximizeZIndex(openedIcons, id, setOpenedIcons);
  };

  const handleClick = (icon: IconType) => {
    const { activated, windowState } = icon;

    if (activated) {
      minimizeWindow(icon.id, setOpenedIcons);
    } else {
      if (windowState !== 'minimized') {
        maximizeZIndex(openedIcons, icon.id, setOpenedIcons);
      }

      if (windowState === 'minimized') {
        openWindow(icon.id);
      }
    }
  };

  return (
    <li data-testid="windowinfo" key={icon.id} style={{ background: thisIconOnOpened.activated ? 'blue' : 'red' }}>
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
