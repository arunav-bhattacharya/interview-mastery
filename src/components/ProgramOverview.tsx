import React from 'react';
import styles from './ProgramOverview.module.css';

interface Pillar {
  key: string;
  title: string;
  topics: number;
  description: string;
  icon: string;
  accent: 'amber' | 'iris' | 'mint' | 'rose';
}

const pillars: Pillar[] = [
  {
    key: 'dsa',
    title: 'Data Structures & Algorithms',
    topics: 9,
    description: 'Patterns: linked lists, two-pointer, sliding window, BFS/DFS, DP, heap, trie, graphs.',
    icon: '◑',
    accent: 'amber',
  },
  {
    key: 'sd',
    title: 'System Design',
    topics: 3,
    description: 'Fundamentals, scaling primitives, and end-to-end case studies.',
    icon: '◈',
    accent: 'iris',
  },
  {
    key: 'be',
    title: 'Java · Spring · AWS',
    topics: 3,
    description: 'Modern Java, Spring Boot APIs, and the AWS services you need to talk about.',
    icon: '◐',
    accent: 'mint',
  },
  {
    key: 'beh',
    title: 'Behavioral',
    topics: 2,
    description: 'STAR method, common questions, and a story bank you can refine.',
    icon: '◓',
    accent: 'rose',
  },
];

const stats = [
  { value: '8', label: 'weeks' },
  { value: '17', label: 'topics' },
  { value: '60+', label: 'practice problems' },
  { value: '∞', label: 'replays' },
];

export default function ProgramOverview() {
  return (
    <section className={styles.wrap}>
      <div className={styles.stats}>
        {stats.map(s => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {pillars.map(p => (
          <div key={p.key} className={`${styles.card} ${styles[p.accent]}`}>
            <div className={styles.cardHead}>
              <span className={styles.icon} aria-hidden>{p.icon}</span>
              <span className={styles.count}>{p.topics} topics</span>
            </div>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardDesc}>{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
