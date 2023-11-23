import NotionSVG from '@/assets/notion.svg';
import GithubSVG from '@/assets/github.svg';
import FolderSVG from '@/assets/folder.svg';
import CodestatesLogo from '@/assets/codestates-logo.svg';
import BlogLogoSVG from '@/assets/blog-logo.svg';
import BrickSVG from '@/assets/brick.svg';

import { IconType } from '@/components/Icon';

export const ICONS: IconType[] = [
  {
    type: 'link',
    id: 1,
    src: NotionSVG,
    alt: '이력서',
    left: 50,
    top: 50,
    link: 'https://www.notion.so/41daf0a85b9f46d186114573d2781a78?pvs=4',
  },
  {
    type: 'link',
    id: 2,
    src: GithubSVG,
    alt: '깃허브',
    left: 50,
    top: 150,
    link: 'https://github.com/ryu9663',
  },
  {
    type: 'link',
    id: 3,
    src: BlogLogoSVG,
    alt: '블로그',
    left: 50,
    top: 250,
    link: 'https://www.wnsdufdl.com/',
  },
  {
    type: 'folder',
    windowState: 'closed',
    id: 4,
    src: FolderSVG,
    alt: '벽돌깨기',
    left: 150,
    top: 350,
    zIndex: 100,
    children: [
      {
        type: 'iframe',
        windowState: 'closed',
        id: 5,
        src: BrickSVG,
        alt: '벽돌깨기',
        left: 50,
        top: 150,
        zIndex: 300,
        iframeSrc: 'https://ryu9663.github.io/break-brick-game/',
      },
    ],
  },
  {
    type: 'folder',
    windowState: 'closed',
    id: 6,
    src: FolderSVG,
    alt: '프로젝트',
    left: 50,
    top: 350,
    zIndex: 100,
    children: [
      {
        type: 'folder',
        windowState: 'closed',
        id: 7,
        src: FolderSVG,
        alt: '코드스테이츠 랜딩페이지',
        left: 50,
        top: 150,
        zIndex: 100,
        children: [
          {
            type: 'file',
            windowState: 'closed',
            id: 8,
            src: CodestatesLogo,
            alt: '코드스테이츠 랜딩페이지',
            left: 50,
            top: 50,
            zIndex: 100,
            markdown: '/markdown/website/landing-page.md',
          },
          {
            type: 'file',
            windowState: 'closed',
            id: 13,
            src: CodestatesLogo,
            alt: 'SSR에서 고려할 것',
            left: 50,
            top: 150,
            zIndex: 100,
            markdown: '/markdown/website/ssr.md',
          },
          {
            type: 'file',
            windowState: 'closed',
            id: 14,
            src: CodestatesLogo,
            alt: 'UI 시스템 개발과정',
            left: 50,
            top: 250,
            zIndex: 100,
            markdown: '/markdown/website/ui-system.md',
          },
        ],
      },
      {
        type: 'folder',
        windowState: 'closed',
        id: 9,
        src: FolderSVG,
        alt: '지원선발 시스템',
        left: 50,
        top: 50,
        zIndex: 100,
        children: [
          {
            type: 'file',
            windowState: 'closed',
            id: 10,
            src: CodestatesLogo,
            alt: '지원선발 시스템',
            left: 50,
            top: 50,
            zIndex: 100,
            markdown: '/markdown/admission-admin/admission-admin.md',
          },
          {
            type: 'file',
            windowState: 'closed',
            id: 11,
            src: CodestatesLogo,
            alt: '타이머로 인한 리렌더링',
            left: 50,
            top: 150,
            zIndex: 100,
            markdown: '/markdown/admission-admin/memo.md',
          },
          {
            type: 'file',
            windowState: 'closed',
            id: 12,
            src: CodestatesLogo,
            alt: '자동저장 구현시 고려할 것',
            left: 50,
            top: 250,
            zIndex: 100,
            markdown: '/markdown/admission-admin/autosave.md',
          },
        ],
      },
    ],
  },
];

/** 언더바에 있는 아이콘의 클래스명 */
export const CLASS_OF_ICON_ON_UNDERBAR = '_window_infoes-button_p0zcy_472';

//** 언더바 height */
export const UNDERBAR_HEIGHT = 50;
