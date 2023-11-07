import styles from './index.module.scss';
import { IconType } from '@/components/Icon';
import { Draggable } from '@/components/Draggable';
import { Button } from 'junyeol-components';
import { useEffect, useState } from 'react';

interface WindowBoxProps {
  icon: IconType;
}
export const WindowBox = ({ icon }: WindowBoxProps) => {
  const { id, src, alt, left, top, children } = icon;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
  }, [id]);

  return (
    isOpen && (
      <div className={styles.windowbox} draggable>
        <header className={styles['windowbox_header']}>
          <ul>
            <li>
              <Button className={styles.button}>-</Button>
            </li>
            <li>
              <Button className={styles.button}>+</Button>
            </li>
            <li>
              <Button className={styles.button} onClick={() => setIsOpen(false)}>
                x
              </Button>
            </li>
          </ul>
        </header>
        {children ? (
          <section>
            <Draggable icons={children} />
          </section>
        ) : (
          <section>
            {id}, {src}, {alt}, {left}, {top}
          </section>
        )}
      </div>
    )
  );
};
