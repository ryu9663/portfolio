import NotionSVG from '@/assets/notion.svg';
import GithubSVG from '@/assets/github.svg';
import FolderSVG from '@/assets/folder.svg';
import CodestatesLogo from '@/assets/codestates-logo.svg';
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
    left: 150,
    top: 50,
    link: 'https://github.com/ryu9663',
  },
  {
    type: 'folder',
    windowState: 'closed',
    id: 3,
    src: FolderSVG,
    alt: '프로젝트',
    left: 250,
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
        top: 50,
        zIndex: 100,
        content: '',
      },
    ],
  },
];

/** 언더바에 있는 아이콘의 클래스명 */
export const CLASS_OF_ICON_ON_UNDERBAR = '_window_infoes-button_p0zcy_472';
