import React from 'react';
import styles from './VizLegend.module.css';

export interface LegendItem {
  swatch: string;          // CSS color
  label: string;
  shape?: 'box' | 'dot' | 'arrow' | 'ring';
}

export default function VizLegend({ items }: { items: LegendItem[] }) {
  return (
    <div className={styles.legend}>
      {items.map((it, i) => (
        <span key={i} className={styles.item}>
          <span
            className={`${styles.swatch} ${styles[it.shape || 'box']}`}
            style={{ background: it.swatch, borderColor: it.swatch }}
            aria-hidden
          />
          <span>{it.label}</span>
        </span>
      ))}
    </div>
  );
}
