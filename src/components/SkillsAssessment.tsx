import React from 'react';
import styles from './SkillsAssessment.module.css';

interface Skill {
  label: string;
  coding: number; // percentage
  systemDesign: number;
  color: string;
}

const skills: Skill[] = [
  { label: 'Problem solving / algorithms', coding: 60, systemDesign: 10, color: '#6366f1' },
  { label: 'Code quality',                 coding: 25, systemDesign: 5,  color: '#a78bfa' },
  { label: 'Communication',                coding: 15, systemDesign: 30, color: '#0891b2' },
  { label: 'Architecture / tradeoffs',     coding: 0,  systemDesign: 55, color: '#10b981' },
];

function StackedBar({ kind }: { kind: 'coding' | 'systemDesign' }) {
  const items = skills.filter(s => s[kind] > 0);
  return (
    <div className={styles.barCol}>
      <div className={styles.barTitle}>{kind === 'coding' ? 'Coding rounds' : 'System Design'}</div>
      <div className={styles.barTrack}>
        {items.map(s => (
          <div
            key={s.label}
            className={styles.segment}
            style={{ width: `${s[kind]}%`, background: s.color }}
            title={`${s.label}: ${s[kind]}%`}
          >
            {s[kind] >= 15 ? <span className={styles.segLabel}>{s[kind]}%</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsAssessment() {
  return (
    <div className={styles.wrap}>
      <StackedBar kind="coding" />
      <StackedBar kind="systemDesign" />
      <div className={styles.legend}>
        {skills.map(s => (
          <span key={s.label} className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
