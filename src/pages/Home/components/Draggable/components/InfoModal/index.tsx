import { useCallback, MouseEvent } from 'react';
import styles from './index.module.scss';
import { useDraggableStore } from '@/pages/Home/components/Draggable/index.store';

export interface OptionType {
  name: string;
  onClick?: () => void;
}
interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: OptionType[];
  isBackdropTransparent?: boolean;
}
export const InfoModal = ({ isOpen, onClose, options, isBackdropTransparent = false }: InfoModalProps) => {
  const [mousePosition, setMousePosition, setIsDraggable] = useDraggableStore(state => [
    state.mousePosition,
    state.setMousePosition,
    state.setIsDraggable,
  ]);

  const onModalClose = useCallback(
    (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsDraggable(true);
      onClose();
    },
    [onClose, setIsDraggable, setMousePosition],
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
            style={{ left: mousePosition.x, top: mousePosition.y }}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {options.map(option => (
              <li key={option.name} onClick={option.onClick}>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
