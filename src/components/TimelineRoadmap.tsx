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
    title: 'Linked Structures & Search',
    focus: 'Linked Lists, Binary Search, Windows',
    topics: ['Reverse / merge', 'Cycle detection', 'Sliding window', 'Binary search on answer'],
    accent: 'amber',
  },
  {
    num: 3,
    title: 'Trees, Graphs, Optimization',
    focus: 'BFS, DFS, Tries, Heap, DP',
    topics: ['Tree traversals', 'Topological sort', 'Top-K heap', '1D / 2D DP'],
    accent: 'amber',
  },
  {
    num: 4,
    title: 'SQL Deep Dive',
    focus: 'Queries, Windows, Indexes',
    topics: ['Joins & grouping', 'Window functions', 'Indexing & EXPLAIN', 'Schema design'],
    accent: 'mint',
  },
  {
    num: 5,
    title: 'System Design',
    focus: 'Scalability, Tradeoffs',
    topics: ['Load balancing', 'Caching', 'Sharding & replication', 'Case studies'],
    accent: 'iris',
  },
  {
    num: 6,
    title: 'Backend Stack',
    focus: 'Java, Spring, AWS',
    topics: ['Spring Boot APIs', 'JPA & transactions', 'AWS core services'],
    accent: 'amber',
  },
  {
    num: 7,
    title: 'Cloud & Platforms',
    focus: 'AWS · Azure · GCP',
    topics: ['Cloud fundamentals', 'Azure essentials', 'GCP essentials'],
    accent: 'iris',
  },
  {
    num: 8,
    title: 'GenAI · Behavioral · Mocks',
    focus: 'LLMs, RAG, agents, STAR',
    topics: ['LLM fundamentals', 'Prompt engineering', 'RAG', 'Agents', 'Behavioral mocks'],
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
