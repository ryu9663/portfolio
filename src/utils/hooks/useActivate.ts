import { IconType } from '@/components/Icon';
import { useEffect, useRef } from 'react';

export const useActivate = <T extends HTMLDivElement>(icon: IconType) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current === null) return;
    if (!icon.activated) {
      ref.current.blur();
    } else {
      ref.current.focus();
    }
  }, [icon.activated]);

  return ref;
};
