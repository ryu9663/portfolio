import NotionSVG from '@/assets/notion.svg';
import GithubSVG from '@/assets/github.svg';
import FolderSVG from '@/assets/folder.svg';
import { IconType } from '@/pages/Home/components/Icon';

export const ICONS: IconType[] = [
  { type: 'file', id: 1, src: NotionSVG, alt: 'notion', left: 50, top: 50 },
  { type: 'file', id: 2, src: GithubSVG, alt: 'github', left: 150, top: 50 },
  { type: 'folder', id: 3, src: FolderSVG, alt: 'Project', left: 250, top: 50 },
];
