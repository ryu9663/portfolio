import { useRef, useState } from 'react';
import styles from './index.module.scss';

interface IconProps {
  iconImg: {
    src: string;
    alt: string;
  };
  isReadOnly: boolean;
  setIsReadOnly: (isReadOnly: boolean) => void;
}
export const Icon = ({ iconImg, isReadOnly, setIsReadOnly }: IconProps) => {
  const [iconTitle, setIconTitle] = useState(iconImg.alt);

  const countRef = useRef(0);

  setTimeout(() => {
    countRef.current = 0;
  }, 3000);

  return (
    <div
      className={styles.icon}
      onMouseDown={e => {
        !isReadOnly && e.stopPropagation();
      }}
    >
      <img src={iconImg.src} alt={iconImg.alt} width={30} height={30} />
      <input
        type="text"
        readOnly={isReadOnly}
        size={iconTitle.length}
        className={`${styles.icon_title} ${isReadOnly ? '' : styles.icon_title_edit}`}
        onClick={() => {
          countRef.current++;
          countRef.current === 2 && setIsReadOnly(false);
        }}
        onFocus={e => {
          !isReadOnly && e.target.select();
        }}
        value={iconTitle}
        onChange={e => {
          if (!isReadOnly) {
            setIconTitle(e.target.value);
          }
        }}
      />
    </div>
  );
};
