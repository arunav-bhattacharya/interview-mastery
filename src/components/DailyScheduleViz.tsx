import React from 'react';
import styles from './DailyScheduleViz.module.css';

interface Block {
  time: string;
  label: string;
  items: string[];
  tone: 'amber' | 'iris' | 'mint' | 'rose';
}

const weekday: Block[] = [
  {
    time: 'Morning',
    label: 'Before work · 1 hr',
    tone: 'amber',
    items: [
      '5 min — review yesterday\'s problems (spaced rep)',
      '45 min — solve LeetCode problems',
      '10 min — note down patterns / learnings',
    ],
  },
  {
    time: 'Evening',
    label: 'After work · 1–1.5 hr',
    tone: 'iris',
    items: [
      '45 min — study topic of the day',
      '15–30 min — review Anki flashcards',
    ],
  },
  {
    time: 'Before bed',
    label: '~30 min',
    tone: 'mint',
    items: ['Watch a YouTube video (NeetCode, ByteByteGo, Gaurav Sen)'],
  },
];

const weekend: Block[] = [
  {
    time: 'Morning',
    label: '~2.5 hr',
    tone: 'amber',
    items: [
      '30 min — review the week\'s problems',
      '90 min — mock interview practice (Pramp / timer)',
      '30 min — review mock interview performance',
    ],
  },
  {
    time: 'Afternoon',
    label: '~2 hr',
    tone: 'iris',
    items: [
      '60 min — deep dive on weak areas',
      '60 min — System Design practice (draw diagrams)',
    ],
  },
  {
    time: 'Evening',
    label: '~1 hr (optional)',
    tone: 'rose',
    items: [
      '30 min — behavioral story preparation',
      '30 min — read technical articles / blogs',
    ],
  },
];

function ScheduleColumn({ title, blocks }: { title: string; blocks: Block[] }) {
  return (
    <section className={styles.col}>
      <h4 className={styles.colTitle}>{title}</h4>
      <div className={styles.timeline}>
        {blocks.map((b, i) => (
          <div key={i} className={`${styles.block} ${styles[b.tone]}`}>
            <div className={styles.blockHead}>
              <span className={styles.blockTime}>{b.time}</span>
              <span className={styles.blockLen}>{b.label}</span>
            </div>
            <ul className={styles.blockList}>
              {b.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DailyScheduleViz() {
  return (
    <div className={styles.wrap}>
      <ScheduleColumn title="Weekdays (2–3 hr / day while working)" blocks={weekday} />
      <ScheduleColumn title="Weekends (4–5 hr / day)" blocks={weekend} />
    </div>
  );
}
