import { useUnderbarStore } from '@/components/UnderBar/index.store';
import styles from './index.module.scss';
import { Button } from 'junyeol-components';
import { InfoModal } from '@/components/InfoModal';
import { IconType } from '@/components/Icon';
import { useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useDraggableStore } from '@/components/Draggable/index.store';

export const IconsOnUnderbar = () => {
  const iconsOnUnderbar = useUnderbarStore(state => state.iconsOnUnderbar);

  return (
    <>
      <ul className={styles['window_infoes']}>
        {iconsOnUnderbar.map(icon => (
          // <li data-testid="windowinfo" key={icon.id}>
          //   <Button className={styles['window_infoes-button']} onContextMenu={() => {}}>
          //     <img src={icon.src} alt={icon.alt} width={30} height={30} /> <span>{icon.alt}</span>
          //   </Button>
          // </li>
          <IconOnUnderbar key={icon.id} icon={icon} />
        ))}
      </ul>
    </>
  );
};

const IconOnUnderbar = ({ icon }: { icon: IconType }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);
  const setOpenedIcons = useWindowBoxStore(state => state.setIcons);
  const setMousePosition = useDraggableStore(state => state.setMousePosition);
  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const closeWindow = (id: number) => {
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
    setOpenedIcons(openedIcons => openedIcons.filter(icon => icon.id !== id));
  };

  return (
    <li data-testid="windowinfo" key={icon.id}>
      <Button
        className={styles['window_infoes-button']}
        onContextMenu={e => {
          e.preventDefault();
          setMousePosition({ x: e.clientX, y: e.clientY });
          setIsInfoModalOpen(true);
        }}
      >
        <img src={icon.src} alt={icon.alt} width={30} height={30} /> <span>{icon.alt}</span>
      </Button>
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        options={[
          {
            name: icon.alt,
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
