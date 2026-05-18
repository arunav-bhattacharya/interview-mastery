import React from 'react';
import styles from './ProgramOverview.module.css';

interface Pillar {
  key: string;
  title: string;
  hours: string;
  description: string;
  accent: 'amber' | 'iris' | 'mint' | 'rose' | 'cyan';
}

const pillars: Pillar[] = [
  {
    key: 'dsa',
    title: 'DSA',
    hours: '30–40 hours',
    description: 'Arrays & Strings · Lists & Trees · Heap & Trie · Graphs & DP · More Patterns · Problem Checklist · Practice Solutions.',
    accent: 'amber',
  },
  {
    key: 'sd',
    title: 'System Design',
    hours: '20–25 hours',
    description: 'Fundamentals · Building Blocks · Advanced Patterns · 3 Case-Study sets · Low-Level Design.',
    accent: 'iris',
  },
  {
    key: 'java',
    title: 'Java',
    hours: '10–15 hours',
    description: 'Core & Concurrency · Spring & Microservices · Design Patterns.',
    accent: 'cyan',
  },
  {
    key: 'sql',
    title: 'SQL',
    hours: '3–4 hours',
    description: 'Joins · GROUP BY · subqueries · CTEs · window functions · query optimization.',
    accent: 'mint',
  },
  {
    key: 'cloud',
    title: 'Cloud',
    hours: '5–6 hours',
    description: 'AWS & Cloud Architecture · GenAI & LLM Engineering.',
    accent: 'iris',
  },
  {
    key: 'beh',
    title: 'Behavioral',
    hours: '3–4 hours',
    description: 'STAR method · common questions · story bank · interview-day checklist.',
    accent: 'rose',
  },
];

const stats = [
  { value: '6', label: 'pillars' },
  { value: '20', label: 'lesson hubs' },
  { value: '4', label: 'languages' },
  { value: '100+', label: 'practice problems' },
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
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <span className={styles.hours}>{p.hours}</span>
            </div>
            <p className={styles.cardDesc}>{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
