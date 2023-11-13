import { useUnderbarStore } from '@/components/UnderBar/index.store';
import styles from './index.module.scss';
import { Button } from 'junyeol-components';
import { InfoModal } from '@/components/InfoModal';
import { IconType, WindowState } from '@/components/Icon';
import { useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { useDraggableStore } from '@/components/Draggable/index.store';
import { useThisWindowState } from '@/utils/hooks/useThisWindow';

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

/** refactor 해야함. handler만 모아서 넣어줘야함 */
const findIconById = (id: number, icons: IconType[]): IconType | null => {
  for (const icon of icons) {
    if (icon.id === id) {
      return icon;
    }

    if (icon.children) {
      const childResult = findIconById(id, icon.children);
      if (childResult) {
        return childResult;
      }
    }
  }

  return null;
};

const IconOnUnderbar = ({ icon }: { icon: IconType }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);
  const [openedWindows, setOpenedWindows] = useWindowBoxStore(state => [state.windows, state.setWindows]);
  const thisIconOnOpened = findIconById(icon.id, openedWindows) as IconType;
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
    /** refactor */
    const collectZIndexes = (icons: IconType[]) =>
      icons.reduce<number[]>((zIndexes, icon) => {
        zIndexes.push(icon.zIndex);

        if (icon.children && icon.children.length > 0) {
          zIndexes = zIndexes.concat(collectZIndexes(icon.children));
        }

        return zIndexes;
      }, []);

    const zIndexs = collectZIndexes(openedWindows);

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
      setThisWindowState({
        ...thisIconOnOpened,
        windowState: WindowState.MINIMIZED,
        activated: false,
      });
    } else {
      if (windowState !== 'minimized') {
        /** refactor */
        const collectZIndexes = (icons: IconType[]) =>
          icons.reduce<number[]>((zIndexes, icon) => {
            zIndexes.push(icon.zIndex);

            if (icon.children && icon.children.length > 0) {
              zIndexes = zIndexes.concat(collectZIndexes(icon.children));
            }

            return zIndexes;
          }, []);
        const zIndexs = collectZIndexes(openedWindows);

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
