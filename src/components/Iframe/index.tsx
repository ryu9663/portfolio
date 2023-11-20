import { FocusEventHandler } from 'react';

interface IframeProps {
  src: string;
  onFocus: FocusEventHandler<HTMLDivElement>;
}
export const Iframe = ({ src, onFocus }: IframeProps) => (
  <div onFocus={onFocus}>
    <iframe src={src} width={500} height={400}></iframe>
  </div>
);
