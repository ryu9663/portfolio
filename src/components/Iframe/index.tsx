import { FocusEventHandler } from 'react';
import styles from './index.module.scss';

interface IframeProps {
  src: string;
  onFocus: FocusEventHandler<HTMLDivElement>;
}
export const Iframe = ({ src, onFocus }: IframeProps) => (
  <div onFocus={onFocus} className={styles.iframe_area}>
    <iframe className={styles.iframe} src={src}></iframe>
  </div>
);
