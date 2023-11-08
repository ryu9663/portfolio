import styles from './index.module.scss';
import { IconType } from '@/components/Icon';
import { Draggable } from '@/components/Draggable';
import { Button } from 'junyeol-components';
import { useEffect, useState } from 'react';
import { useWindowBoxStore } from '@/components/WindowBox/index.store';
import { maximizeZIndex as _maximizeZIndex } from '@/utils';
import { useUnderbarStore } from '@/components/UnderBar/index.store';

interface WindowBoxProps {
  icon: IconType;
  index: number;
}

export const WindowBox = ({ icon, index }: WindowBoxProps) => {
  const { id, src, alt, left, top, children } = icon;
  const [isOpen, setIsOpen] = useState(false);
  const newTapPosition = index === 0 ? 1 : index * 30;
  const [openedIcons, setOpenedIcons] = useWindowBoxStore(state => [state.icons, state.setIcons]);
  const setIconsOnUnderbar = useUnderbarStore(state => state.setIconsOnUnderbar);

  const maximizeZIndex = () => _maximizeZIndex(openedIcons, id, setOpenedIcons);

  useEffect(() => {
    setIsOpen(true);
  }, [id]);

  const onClose = (id: number) => {
    setIsOpen(false);
    setIconsOnUnderbar(iconsOnUnderbar => iconsOnUnderbar.filter(icon => icon.id !== id));
  };

  return (
    isOpen && (
      <div
        tabIndex={0}
        className={styles.windowbox}
        style={{ left: 200 + newTapPosition, top: 100 + newTapPosition, zIndex: icon.zIndex }}
        draggable
        onClick={maximizeZIndex}
      >
        <header className={styles['windowbox_header']}>
          <ul>
            <li>
              <Button className={styles.button}>-</Button>
            </li>
            <li>
              <Button className={styles.button}>+</Button>
            </li>
            <li>
              <Button className={styles.button} onClick={() => onClose(icon.id)}>
                x
              </Button>
            </li>
          </ul>
        </header>
        <section className={styles['windowbox_body']}>
          {children ? (
            <Draggable icons={children} />
          ) : (
            <div>
              ({id}, {src}, {alt}, {left}, {top})
            </div>
          )}
        </section>
      </div>
    )
  );
};
