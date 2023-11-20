import { Button } from 'junyeol-components';
import styles from './index.module.scss';
import { User } from 'react-feather';
import GithubSVG from '@/assets/github.svg';
import { useUnderbarStore } from '@/components/UnderBar/index.store';
import { IconFileType } from '@/components/Icon';
import { useWindow } from '@/utils/hooks/useWindow';

import CodestatesLogo from '@/assets/codestates-logo.svg';

const GRAY_500 = '#a3a3a3';

export const NavBar = () => {
  const isModalOpen = useUnderbarStore(state => state.isModalOpen);

  return (
    <nav className={`${styles['priority-0']} ${styles.nav} ${isModalOpen ? styles.nav_isopen : ''}`}>
      <ul className={styles.nav_information}>
        <span className={styles.nav_title}>INFO</span>
        <li>
          <Button>
            <a href="https://www.notion.so/41daf0a85b9f46d186114573d2781a78?pvs=4" target="_blank">
              <User color={GRAY_500} />
            </a>
          </Button>
        </li>
        <li>
          <a href="https://wnsdufdl.tistory.com" target="_blank">
            <Button>BLOG</Button>
          </a>
        </li>
        <li>
          <a href="https://github.com/ryu9663" target="_blank">
            <Button>
              <img src={GithubSVG} alt="깃허브" width={20} height={20} />
            </Button>
          </a>
        </li>
      </ul>

      <ul className={styles.nav_project}>
        <span className={styles.nav_title}>PROJECT</span>
        <li>
          <OpenWindowButton
            icon={{
              type: 'file',
              windowState: 'closed',
              id: 5,
              src: CodestatesLogo,
              alt: '지원선발 시스템',
              left: 50,
              top: 50,
              zIndex: 100,
              markdown: '/markdown/admission-admin.md',
            }}
          />
        </li>

        <li>
          <OpenWindowButton
            icon={{
              type: 'file',
              windowState: 'closed',
              id: 4,
              src: CodestatesLogo,
              alt: '코드스테이츠 랜딩페이지',
              left: 50,
              top: 150,
              zIndex: 100,
              markdown: '/markdown/landing-page.md',
            }}
          />
        </li>
      </ul>
    </nav>
  );
};

const OpenWindowButton = ({ icon }: { icon: IconFileType }) => {
  const openWindow = useWindow(icon);

  return <Button onClick={() => openWindow()}>{icon.alt}</Button>;
};
