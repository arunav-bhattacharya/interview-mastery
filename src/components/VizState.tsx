import React from 'react';
import styles from './VizState.module.css';

export interface StateRow {
  label: string;
  value: React.ReactNode;
  tone?: 'accent' | 'success' | 'warn' | 'muted';
  /** Make this row span the full state-panel width — for longer narrative values. */
  wide?: boolean;
}

export default function VizState({ rows }: { rows: StateRow[] }) {
  const compact = rows.filter(r => !r.wide);
  const wide = rows.filter(r => r.wide);

  return (
    <div className={styles.state}>
      {compact.length > 0 ? (
        <dl className={styles.grid}>
          {compact.map((r, i) => (
            <div key={i} className={styles.row}>
              <dt className={styles.label}>{r.label}</dt>
              <dd className={`${styles.value} ${r.tone ? styles[r.tone] : ''}`}>{r.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {wide.map((r, i) => (
        <div key={i} className={`${styles.wideRow} ${r.tone ? styles[r.tone] : ''}`}>
          <span className={styles.wideLabel}>{r.label}</span>
          <span className={styles.wideValue}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}
