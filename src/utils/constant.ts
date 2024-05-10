// import NotionSVG from '@/assets/notion.svg';
import GithubSVG from '@/assets/github.svg';
import FolderSVG from '@/assets/folder.svg';
import CodestatesLogo from '@/assets/codestates-logo.svg';
import BlogLogoSVG from '@/assets/blog-logo.svg';
import BrickSVG from '@/assets/brick.svg';
import HiviliageSVG from '@/assets/hiviliage.svg';
import StorybookSVG from '@/assets/storybook.svg';
import DigimonSVG from '@/assets/digimon.svg';
import { IconType } from '@/components/Icon';
//12차례
export const ICONS: IconType[] = [
  // {
  //   type: 'link',
  //   id: 1,
  //   src: NotionSVG,
  //   alt: '이력서',
  //   left: 50,
  //   top: 50,
  //   link: 'https://www.notion.so/41daf0a85b9f46d186114573d2781a78?pvs=4',
  // },
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
    id: 8,
    src: BlogLogoSVG,
    alt: '블로그',
    left: 50,
    top: 50,
    link: 'https://www.wnsdufdl.com/',
  },

  {
    type: 'folder',
    windowState: 'closed',
    id: 3,
    src: FolderSVG,
    alt: '프로젝트',
    left: 150,
    top: 50,
    zIndex: 100,
    children: [
      {
        type: 'file',
        windowState: 'closed',
        id: 4,
        src: CodestatesLogo,
        alt: '코드스테이츠 랜딩페이지',
        left: 50,
        top: 150,
        zIndex: 100,
        markdown: '/markdown/website/landing-page.md',
      },
      {
        type: 'file',
        windowState: 'closed',
        id: 5,
        src: CodestatesLogo,
        alt: '지원선발 시스템',
        left: 50,
        top: 50,
        zIndex: 100,
        markdown: '/markdown/admission-admin/admission-admin.md',
      },
      {
        type: 'folder',
        windowState: 'closed',
        id: 6,
        src: FolderSVG,
        alt: '심심풀이',
        left: 150,
        top: 350,
        zIndex: 100,
        children: [
          {
            type: 'iframe',
            windowState: 'closed',
            id: 7,
            src: BrickSVG,
            alt: '벽돌깨기',
            left: 50,
            top: 150,
            zIndex: 300,
            iframeSrc: 'https://ryu9663.github.io/break-brick-game/',
          },
          {
            type: 'iframe',
            windowState: 'closed',
            id: 11,
            src: DigimonSVG,
            alt: '디지몬 카드 돌리기',
            left: 50,
            top: 250,
            zIndex: 300,
            iframeSrc: 'https://ryu9663.github.io/card-rotation/',
          },
          {
            type: 'file',
            windowState: 'closed',
            id: 10,
            src: HiviliageSVG,
            alt: '하이빌리지',
            left: 50,
            top: 50,
            zIndex: 100,
            markdown: '/markdown/side-project/hivilliage.md',
          },
          {
            type: 'file',
            windowState: 'closed',

            id: 9,
            src: StorybookSVG,
            alt: '컴포넌트 라이브러리',
            left: 150,
            top: 50,
            zIndex: 100,
            markdown: '/markdown/side-project/jcl.md',
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
