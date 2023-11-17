import { OpenableIconType } from '@/components/Icon';
import { useEffect, useRef } from 'react';

export const useActivate = <T extends HTMLDivElement>(icon: OpenableIconType) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current && !icon.activated) {
      ref.current.blur();
    }
  }, [icon.activated]);

  return ref;
};
