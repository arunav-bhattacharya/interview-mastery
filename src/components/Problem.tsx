import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import Difficulty from './Difficulty';
import { problemStore } from './problemStore';
import type { ChecklistStore } from './checklistStore';
import styles from './Problem.module.css';

type Level = 'easy' | 'medium' | 'hard' | 'Easy' | 'Medium' | 'Hard';

export interface ProblemProps {
  id: string;
  url: string;
  difficulty: Level;
  children: React.ReactNode;
  pattern?: string; // optional grouping key for ChecklistSummary
  store?: ChecklistStore; // optional override; defaults to DSA problemStore
}

function ProblemInner({ id, url, difficulty, children, pattern, store }: ProblemProps) {
  const s = store ?? problemStore;
  const [checked, setLocal] = useState<boolean>(() => s.isChecked(id));

  useEffect(() => {
    const unsub = s.subscribe(() => setLocal(s.isChecked(id)));
    return unsub;
  }, [id, s]);

  const toggle = () => {
    const next = !checked;
    s.setChecked(id, next);
    setLocal(next);
  };

  return (
    <div
      className={`${styles.row} ${checked ? styles.checked : ''}`}
      data-problem-id={id}
      data-problem-pattern={pattern || ''}
      data-store-key={s.storageKey}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={toggle}
        aria-label={typeof children === 'string' ? children : 'Mark problem complete'}
      />
      <Link to={url} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
      <Difficulty level={difficulty} />
    </div>
  );
}

export default function Problem(props: ProblemProps): React.ReactElement {
  // SSR can't read localStorage; render the unchecked shell, hydrate on client.
  return (
    <BrowserOnly fallback={<ProblemFallback {...props} />}>
      {() => <ProblemInner {...props} />}
    </BrowserOnly>
  );
}

function ProblemFallback({ id, url, difficulty, children, pattern, store }: ProblemProps) {
  const key = (store ?? problemStore).storageKey;
  return (
    <div
      className={styles.row}
      data-problem-id={id}
      data-problem-pattern={pattern || ''}
      data-store-key={key}
    >
      <input type="checkbox" className={styles.checkbox} disabled />
      <Link to={url} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
      <Difficulty level={difficulty} />
    </div>
  );
}
