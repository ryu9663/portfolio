/*eslint-env es6*/

import { useEffect, useState } from 'react';
// import DockBar from "./DockBar";
import DockBar from '@/components/Dock/DockBar';
import styles from './index.module.scss';

export const Dock = () => {
  const [dockBarOpen, setDockBarOpen] = useState(false);
  const handleCloseDockBar = () => {
    setDockBarOpen(false);
  };

  useEffect(() => {
    if (dockBarOpen) {
      console.log('hi');
    }
  }, []);
  return (
    <div className={styles['dock-wrapper']}>
      <DockBar open={dockBarOpen} onClose={handleCloseDockBar} />
      <div className={styles['bottom-bar']}>
        <button
          onClick={() => {
            setDockBarOpen(!dockBarOpen);
          }}
        >
          시작
        </button>
      </div>
    </div>
  );
};
