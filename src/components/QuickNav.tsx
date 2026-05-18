import React from 'react';
import styles from './QuickNav.module.css';

export interface QuickNavItem {
  label: string;
  href: string;
}

export default function QuickNav({ items }: { items: QuickNavItem[] }) {
  return (
    <nav className={styles.wrap} aria-label="Quick navigation">
      <div className={styles.head}>
        <span className={styles.headIcon} aria-hidden>☰</span>
        <span className={styles.headLabel}>Quick Navigation</span>
      </div>
      <div className={styles.pills}>
        {items.map((it, i) => (
          <a key={i} href={it.href} className={styles.pill}>{it.label}</a>
        ))}
      </div>
    </nav>
  );
}
