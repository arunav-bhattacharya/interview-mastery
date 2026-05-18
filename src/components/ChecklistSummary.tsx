import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { getCheckedSet, subscribe, resetAll } from './problemStore';
import styles from './ChecklistSummary.module.css';

export interface PatternTarget {
  name: string;
  target: number;
  anchor?: string; // optional href anchor (without #)
}

interface Props {
  patterns: PatternTarget[];
}

function SummaryInner({ patterns }: Props) {
  const [version, setVersion] = useState(0);

  useEffect(() => subscribe(() => setVersion((v) => v + 1)), []);

  // Recompute on every change.
  const checkedSet = getCheckedSet();

  // We count by reading data-problem-pattern on rendered <Problem> elements in
  // the DOM. This couples to live page state, but is the simplest way to get
  // per-pattern counts without duplicating the problem list inside the
  // summary component.
  const counts: Record<string, number> = {};
  if (typeof document !== 'undefined') {
    const rows = document.querySelectorAll<HTMLElement>('[data-problem-id][data-problem-pattern]');
    rows.forEach((r) => {
      const id = r.getAttribute('data-problem-id');
      const pat = r.getAttribute('data-problem-pattern');
      if (!id || !pat) return;
      if (checkedSet.has(id)) counts[pat] = (counts[pat] || 0) + 1;
    });
  }

  const totalTarget = patterns.reduce((s, p) => s + p.target, 0);
  const totalDone = patterns.reduce((s, p) => s + (counts[p.name] || 0), 0);
  const pct = totalTarget ? Math.round((totalDone / totalTarget) * 100) : 0;

  const reset = () => {
    if (window.confirm('Reset all problem progress?')) resetAll();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <div className={styles.totals}>
          <span className={styles.totalsNumber}>{totalDone}</span>
          <span className={styles.totalsSlash}>/</span>
          <span className={styles.totalsTarget}>{totalTarget}</span>
          <span className={styles.totalsLabel}>solved</span>
        </div>
        <div className={styles.pctWrap}>
          <div className={styles.pctBarOuter}>
            <div className={styles.pctBarInner} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.pctText}>{pct}%</span>
        </div>
        <button type="button" className={styles.reset} onClick={reset} aria-label="Reset progress">
          Reset
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Pattern</th>
            <th>Target</th>
            <th>Done</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {patterns.map((p) => {
            const done = counts[p.name] || 0;
            const rowPct = p.target ? Math.round((done / p.target) * 100) : 0;
            const cell = (
              <>
                {p.name}
                {p.anchor && (
                  <a href={`#${p.anchor}`} className={styles.jump} aria-label={`Jump to ${p.name}`}>
                    ↓
                  </a>
                )}
              </>
            );
            return (
              <tr key={p.name} className={done >= p.target ? styles.complete : ''}>
                <td>{cell}</td>
                <td className={styles.num}>{p.target}</td>
                <td className={styles.num}>
                  <strong>{done}</strong>
                </td>
                <td>
                  <div className={styles.miniBar}>
                    <div className={styles.miniBarFill} style={{ width: `${Math.min(100, rowPct)}%` }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function ChecklistSummary(props: Props): React.ReactElement {
  return (
    <BrowserOnly fallback={<div className={styles.wrap}>Loading progress…</div>}>
      {() => <SummaryInner {...props} />}
    </BrowserOnly>
  );
}
