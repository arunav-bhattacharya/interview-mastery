import React from 'react';
import styles from './Pillbar.module.css';

export interface Pill {
  label: string;
  value?: string | number;
}

export default function Pillbar({ pills }: { pills: Pill[] }) {
  return (
    <div className={styles.bar}>
      {pills.map((p, i) => (
        <span key={i} className={styles.pill}>
          <span className={styles.label}>{p.label}</span>
          {p.value !== undefined ? <span className={styles.value}>{p.value}</span> : null}
        </span>
      ))}
    </div>
  );
}
