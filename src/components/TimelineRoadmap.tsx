import React from 'react';
import styles from './TimelineRoadmap.module.css';

interface Week {
  num: number;
  title: string;
  focus: string;
  topics: string[];
  accent: 'amber' | 'iris' | 'mint' | 'rose';
}

const weeks: Week[] = [
  {
    num: 1,
    title: 'Foundations',
    focus: 'Arrays, Strings, Hashing',
    topics: ['Big-O', 'Two-pointer warmup', 'HashMap patterns'],
    accent: 'amber',
  },
  {
    num: 2,
    title: 'Linked Structures',
    focus: 'Linked Lists, Stacks, Queues',
    topics: ['Reverse / merge', 'Cycle detection', 'Monotonic stack'],
    accent: 'amber',
  },
  {
    num: 3,
    title: 'Search & Windows',
    focus: 'Binary Search, Sliding Window',
    topics: ['Search on answer', 'Variable / fixed windows', 'Prefix sums'],
    accent: 'amber',
  },
  {
    num: 4,
    title: 'Trees & Graphs',
    focus: 'BFS, DFS, Tries',
    topics: ['Tree traversals', 'Graph traversal', 'Topological sort'],
    accent: 'amber',
  },
  {
    num: 5,
    title: 'Optimization',
    focus: 'DP, Greedy, Heap',
    topics: ['1D / 2D DP', 'Top-K', 'Interval scheduling'],
    accent: 'iris',
  },
  {
    num: 6,
    title: 'System Design',
    focus: 'Scalability, Tradeoffs',
    topics: ['Load balancing', 'Caching', 'Sharding & replication'],
    accent: 'iris',
  },
  {
    num: 7,
    title: 'Backend Stack',
    focus: 'Java, Spring, AWS',
    topics: ['Spring Boot APIs', 'JPA & transactions', 'AWS core services'],
    accent: 'mint',
  },
  {
    num: 8,
    title: 'Behavioral & Mocks',
    focus: 'STAR, story bank, polish',
    topics: ['Leadership stories', 'Failure stories', 'Mock interviews'],
    accent: 'rose',
  },
];

export default function TimelineRoadmap() {
  return (
    <ol className={styles.timeline}>
      {weeks.map((w, i) => (
        <li key={w.num} className={`${styles.row} ${styles[w.accent]}`}>
          <div className={styles.markerCol}>
            <div className={styles.marker}>
              <span className={styles.markerLabel}>W{w.num}</span>
            </div>
            {i < weeks.length - 1 ? <div className={styles.connector} /> : null}
          </div>
          <div className={styles.card}>
            <div className={styles.headRow}>
              <h3 className={styles.title}>{w.title}</h3>
              <span className={styles.focus}>{w.focus}</span>
            </div>
            <div className={styles.tags}>
              {w.topics.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
