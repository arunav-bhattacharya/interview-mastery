import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './StudyPlanBoard.module.css';

type Status = 'todo' | 'doing' | 'done';

interface Topic {
  id: string;
  label: string;
  group: string;
}

const seed: Topic[] = [
  { id: 'arrays',         label: 'Arrays & Hashing',     group: 'DSA' },
  { id: 'linked-list',    label: 'Linked List',          group: 'DSA' },
  { id: 'two-pointer',    label: 'Two-Pointer',          group: 'DSA' },
  { id: 'sliding-window', label: 'Sliding Window',       group: 'DSA' },
  { id: 'binary-search',  label: 'Binary Search',        group: 'DSA' },
  { id: 'bfs-dfs',        label: 'BFS / DFS',            group: 'DSA' },
  { id: 'dp',             label: 'Dynamic Programming',  group: 'DSA' },
  { id: 'heap',           label: 'Heap / Priority Queue',group: 'DSA' },
  { id: 'trie',           label: 'Trie',                 group: 'DSA' },
  { id: 'graphs',         label: 'Graphs',               group: 'DSA' },
  { id: 'sd-fund',        label: 'System Design Fundamentals', group: 'System Design' },
  { id: 'sd-scale',       label: 'Scaling Primitives',   group: 'System Design' },
  { id: 'sd-cases',       label: 'Case Studies',         group: 'System Design' },
  { id: 'java',           label: 'Java Essentials',      group: 'Backend' },
  { id: 'spring',         label: 'Spring Boot',          group: 'Backend' },
  { id: 'aws',            label: 'AWS Essentials',       group: 'Backend' },
  { id: 'star',           label: 'STAR Method',          group: 'Behavioral' },
  { id: 'beh-q',          label: 'Common Questions',     group: 'Behavioral' },
];

const STORAGE_KEY = 'im-study-plan-v1';

function loadStatuses(): Record<string, Status> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function saveStatuses(s: Record<string, Status>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

const order: Status[] = ['todo', 'doing', 'done'];
const titles: Record<Status, string> = { todo: 'Not started', doing: 'In progress', done: 'Done' };

function Inner() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(() => loadStatuses());
  useEffect(() => { setStatuses(loadStatuses()); }, []);

  const cycle = (id: string) => {
    setStatuses(prev => {
      const cur = prev[id] || 'todo';
      const idx = order.indexOf(cur);
      const next = { ...prev, [id]: order[(idx + 1) % order.length] };
      saveStatuses(next);
      return next;
    });
  };

  const columns = useMemo(() => {
    const cols: Record<Status, Topic[]> = { todo: [], doing: [], done: [] };
    seed.forEach(t => cols[statuses[t.id] || 'todo'].push(t));
    return cols;
  }, [statuses]);

  const totalDone = columns.done.length;

  return (
    <div className={styles.wrap}>
      <div className={styles.summary}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(totalDone / seed.length) * 100}%` }}
          />
        </div>
        <span className={styles.progressLabel}>
          {totalDone} / {seed.length} topics complete
        </span>
      </div>
      <div className={styles.board}>
        {order.map(col => (
          <div key={col} className={`${styles.column} ${styles[col]}`}>
            <div className={styles.columnHead}>
              <h4 className={styles.columnTitle}>{titles[col]}</h4>
              <span className={styles.columnCount}>{columns[col].length}</span>
            </div>
            <div className={styles.cards}>
              {columns[col].map(t => (
                <button
                  key={t.id}
                  className={styles.card}
                  onClick={() => cycle(t.id)}
                  aria-label={`Move ${t.label} to next status`}
                >
                  <span className={styles.cardGroup}>{t.group}</span>
                  <span className={styles.cardLabel}>{t.label}</span>
                </button>
              ))}
              {columns[col].length === 0 ? (
                <div className={styles.empty}>—</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <p className={styles.note}>
        Click a card to advance its status — Not started → In progress → Done.
      </p>
    </div>
  );
}

export default function StudyPlanBoard() {
  return (
    <BrowserOnly fallback={<div className={styles.wrap} />}>{() => <Inner />}</BrowserOnly>
  );
}
