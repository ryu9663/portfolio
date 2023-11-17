/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenableIconType } from '@/components/Icon';

/** children까지 순회하여 zIndex를 모은다. */
export const getZIndexesWithChildren = (icons: OpenableIconType[]) =>
  icons.reduce<number[]>((zIndexes, icon) => {
    zIndexes.push(icon.zIndex);

    if (icon.type !== 'file' && icon.children && icon.children.length > 0) {
      const { children } = icon;
      zIndexes = zIndexes.concat(getZIndexesWithChildren(children));
    }

    return zIndexes;
  }, []);

/** children까지 탐색한다. */
export const findIconByIdWithChildren = (id: number, icons: OpenableIconType[]): OpenableIconType => {
  for (const icon of icons) {
    if (icon.id === id) {
      return icon;
    }

    if (icon.type === 'folder' && icon.children) {
      const childResult = findIconByIdWithChildren(id, icon.children);
      if (childResult) {
        return childResult;
      }
    }
  }
  console.log(id);
  throw Error('id가 맞는 아이콘을 찾지 못했습니다.');
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
