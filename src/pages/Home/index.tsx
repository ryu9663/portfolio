import Draggable from 'react-draggable';
import styles from './index.module.scss';
import { Icon } from '@/pages/Home/components/Icon';
import { useState } from 'react';
import { ICON_IMAGES } from '@/utils/constant';

const Home = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  return (
    <div className={styles.home} onClick={() => setIsReadOnly(true)}>
      <Draggable>
        <div
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {ICON_IMAGES.map((iconImg, i) => (
            <div key={i}>
              <Icon isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} iconImg={iconImg} />
            </div>
          ))}
        </div>
      </Draggable>
    </div>
  );
};

export default Home;
