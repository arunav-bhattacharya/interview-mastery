import React from 'react';
import styles from './CheckpointsGrid.module.css';

interface Checkpoint {
  area: string;
  goal: string;
  verify: string;
  tone: 'amber' | 'iris' | 'mint' | 'rose' | 'cyan';
}

const checkpoints: Checkpoint[] = [
  { area: 'DSA',           goal: 'Solve array / string mediums in 25 min', verify: 'Time yourself on 3 new problems', tone: 'amber' },
  { area: 'DSA',           goal: 'Implement tree traversals without reference', verify: 'Write BFS / DFS from memory', tone: 'amber' },
  { area: 'DSA',           goal: 'Identify DP vs. Greedy problems',         verify: 'Categorize 10 random problems', tone: 'amber' },
  { area: 'System Design', goal: 'Explain LB, caching, sharding',           verify: 'Teach it to someone', tone: 'iris' },
  { area: 'System Design', goal: 'Design Twitter feed in 45 min',           verify: 'Record yourself, review', tone: 'iris' },
  { area: 'Java',          goal: 'Answer concurrency questions',            verify: 'Quiz yourself', tone: 'cyan' },
  { area: 'Cloud',         goal: 'Architect AWS solutions',                 verify: 'Draw diagrams for 3 scenarios', tone: 'mint' },
  { area: 'Behavioral',    goal: 'Deliver 10 STAR stories smoothly',        verify: 'Record and review', tone: 'rose' },
];

export default function CheckpointsGrid() {
  return (
    <div className={styles.grid}>
      {checkpoints.map((c, i) => (
        <div key={i} className={`${styles.card} ${styles[c.tone]}`}>
          <span className={styles.area}>{c.area}</span>
          <h4 className={styles.goal}>{c.goal}</h4>
          <p className={styles.verify}>{c.verify}</p>
        </div>
      ))}
    </div>
  );
}
