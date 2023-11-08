import { useCallback, MouseEvent, MouseEventHandler } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/components/Draggable/index.store';

export interface OptionType {
  name: string;
  onClick: MouseEventHandler<HTMLLIElement>;
}

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: OptionType[];
  isBackdropTransparent?: boolean;
  isUpward?: boolean;
}
export const InfoModal = ({
  isOpen,
  onClose,
  options,
  isBackdropTransparent = false,
  isUpward = false,
}: InfoModalProps) => {
  const [mousePosition, setMousePosition] = useDraggableStore(state => [state.mousePosition, state.setMousePosition]);

  const onModalClose = useCallback(
    (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      onClose();
    },
    [onClose, setMousePosition],
  );

  return (
    <>
      {isOpen && (
        <div
          className={`${styles.back_drop} ${styles['priority-1']} ${
            isBackdropTransparent ? styles['backdrop-transperant'] : ''
          }`}
          onClick={e => {
            onModalClose(e);
          }}
          onContextMenu={e => {
            e.preventDefault();
            onModalClose(e);
          }}
        >
          <ul
            className={styles.info_modal}
            style={{ left: mousePosition.x, top: mousePosition.y - (isUpward ? 80 : 0) }}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {options.map(option => (
              <li
                key={option.name}
                onClick={e => {
                  option.onClick(e);
                  onClose();
                }}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
