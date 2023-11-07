import { Button } from 'junyeol-components';
import styles from './index.module.scss';
import { User } from 'react-feather';
import GithubSVG from '@/assets/github.svg';
import { useUnderbarStore } from '@/components/UnderBar/index.store';

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
          <Button>지원선발 시스템 어드민</Button>
        </li>
        <li>
          <Button>지원선발 시스템 클라이언트</Button>
        </li>
        <li>
          <Button>코드스테이츠 랜딩페이지</Button>
        </li>
      </ul>
    </nav>
  );
};
