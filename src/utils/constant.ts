import NotionSVG from '@/assets/notion.svg';
import GithubSVG from '@/assets/github.svg';
import FolderSVG from '@/assets/folder.svg';
import { IconType } from '@/components/Icon';

export const ICONS: IconType[] = [
  {
    type: 'link',
    id: 1,
    src: NotionSVG,
    alt: 'notion',
    left: 50,
    top: 50,
    link: 'https://www.notion.so/41daf0a85b9f46d186114573d2781a78?pvs=4',
  },
  {
    type: 'file',
    windowState: 'closed',
    id: 2,
    src: GithubSVG,
    alt: 'github',
    left: 150,
    top: 50,
    zIndex: 100,
    content: '',
  },
  {
    type: 'folder',
    windowState: 'closed',
    id: 3,
    src: FolderSVG,
    alt: 'Project',
    left: 250,
    top: 50,
    zIndex: 100,
    children: [
      {
        type: 'file',
        windowState: 'closed',
        id: 4,
        src: NotionSVG,
        alt: 'notion',
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
