import { Draggable } from '@/components/Draggable';
import { IconFileType, IconType, OpenableIconType } from '@/components/Icon';
import { Iframe } from '@/components/Iframe';
import { Markdown } from '@/components/Markdown';
import { FocusEventHandler } from 'react';

/** children까지 순회하여 zIndex를 모은다. */
export const getZIndexesWithChildren = (icons: OpenableIconType[]) =>
  icons.reduce<number[]>((zIndexes, icon) => {
    zIndexes.push(icon.zIndex);

    if (icon.type === 'folder' && icon.children && icon.children.length > 0) {
      const { children } = icon;
      zIndexes = zIndexes.concat(getZIndexesWithChildren(children));
    }

    return zIndexes;
  }, []);

/** children까지 탐색한다. */
export const findIconByIdWithChildren = (id: number, icons: OpenableIconType[]): OpenableIconType => {
  const findThisIcon = (id: number, icons: OpenableIconType[]): OpenableIconType | null => {
    for (const icon of icons) {
      if (icon.id === id) {
        return icon;
      }

      if (icon.type === 'folder' && icon.children) {
        const childResult = findThisIcon(id, icon.children);
        if (childResult) {
          return childResult;
        }
      }
    }

    return null;
  };
  const thisIcon = findThisIcon(id, icons);
  if (thisIcon === null) throw Error('id를 못찾는데 이건 설계상 있을 수 없는 일이야.');
  return thisIcon;
};

/** 객체 배열을 순회하면서 각 객체의 children 속성도 순회하는 함수 */
export const flattenAndExtract = <T extends { children?: T[] }, U>(nodes: T[], callback: (node: T) => U): U[] => {
  const result: U[] = [];

  nodes.map(node => {
    result.push(callback(node));
    if (node.children) {
      result.push(...flattenAndExtract(node.children, callback));
    }
  });
  return result;
};

export const renderWindowbox = (icon: OpenableIconType, onFocus: FocusEventHandler<HTMLDivElement>) => {
  switch (icon.type) {
    case IconType.FOLDER:
      return <Draggable icons={icon.children || []} />;

    case IconType.FILE:
      return (
        <>
          <Markdown markdown={(icon as IconFileType).markdown} />
        </>
      );
    case IconType.IFRAME:
      return <Iframe src={icon.iframeSrc} onFocus={onFocus} />;
  }
};
