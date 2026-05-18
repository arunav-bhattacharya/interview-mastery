import React from 'react';
import styles from './PacingCards.module.css';

interface Pace {
  profile: string;
  cadence: string;
  hours: string;
  tone: 'amber' | 'iris' | 'mint';
}

const paces: Pace[] = [
  {
    profile: 'Full-time job, limited time',
    cadence: '1 module / 2 days',
    hours: '~1 hr / day',
    tone: 'amber',
  },
  {
    profile: 'Job hunting with focused time',
    cadence: '1 module / day',
    hours: '2–3 hr / day',
    tone: 'iris',
  },
  {
    profile: 'With significant prep time',
    cadence: '1 module / half-day',
    hours: 'several hr / day',
    tone: 'mint',
  },
];

export default function PacingCards() {
  return (
    <div className={styles.grid}>
      {paces.map(p => (
        <div key={p.profile} className={`${styles.card} ${styles[p.tone]}`}>
          <div className={styles.profile}>{p.profile}</div>
          <div className={styles.cadence}>{p.cadence}</div>
          <div className={styles.hours}>{p.hours}</div>
        </div>
      ))}
    </div>
  );
}
