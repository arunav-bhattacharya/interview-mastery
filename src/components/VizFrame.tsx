import React from 'react';
import styles from './VizFrame.module.css';

export default function VizFrame({
  title,
  caption,
  children,
}: {
  title?: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={styles.frame}>
      {title ? <figcaption className={styles.title}>{title}</figcaption> : null}
      <div className={styles.stage}>{children}</div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
