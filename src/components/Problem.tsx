import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import Difficulty from './Difficulty';
import { isChecked, setChecked, subscribe } from './problemStore';
import styles from './Problem.module.css';

type Level = 'easy' | 'medium' | 'hard' | 'Easy' | 'Medium' | 'Hard';

interface Props {
  id: string;
  url: string;
  difficulty: Level;
  children: React.ReactNode;
  pattern?: string; // optional grouping key for ChecklistSummary
}

function ProblemInner({ id, url, difficulty, children, pattern }: Props) {
  const [checked, setLocal] = useState<boolean>(() => isChecked(id));

  useEffect(() => {
    const unsub = subscribe(() => setLocal(isChecked(id)));
    return unsub;
  }, [id]);

  const toggle = () => {
    const next = !checked;
    setChecked(id, next);
    setLocal(next);
  };

  return (
    <div
      className={`${styles.row} ${checked ? styles.checked : ''}`}
      data-problem-id={id}
      data-problem-pattern={pattern || ''}
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

export default function Problem(props: Props): React.ReactElement {
  // SSR can't read localStorage; render the unchecked shell, hydrate on client.
  return (
    <BrowserOnly fallback={<ProblemFallback {...props} />}>
      {() => <ProblemInner {...props} />}
    </BrowserOnly>
  );
}

function ProblemFallback({ id, url, difficulty, children, pattern }: Props) {
  return (
    <div className={styles.row} data-problem-id={id} data-problem-pattern={pattern || ''}>
      <input type="checkbox" className={styles.checkbox} disabled />
      <Link to={url} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
      <Difficulty level={difficulty} />
    </div>
  );
}
