import React from 'react';
import styles from './RoundsBoard.module.css';

interface Round {
  name: string;
  length: string;
  focus: string;
  accent: 'amber' | 'iris' | 'mint' | 'rose' | 'cyan';
}

const rounds: Round[] = [
  { name: 'Phone screen',      length: '45–60 min', focus: 'One algorithm problem · communication · basic system thinking', accent: 'amber' },
  { name: 'Coding (×2–3)',     length: '45–60 min', focus: 'Medium / hard algorithm + design discussion',                  accent: 'amber' },
  { name: 'System Design',     length: '45–60 min', focus: 'Large-scale architecture · tradeoffs · scaling',                accent: 'iris' },
  { name: 'Low-Level Design',  length: '45–60 min', focus: 'OOP modelling · clean class design',                            accent: 'cyan' },
  { name: 'Behavioral',        length: '45–60 min', focus: 'STAR-method stories · leadership · conflict',                   accent: 'rose' },
  { name: 'Hiring manager',    length: '30–45 min', focus: 'Fit · scope · motivation',                                       accent: 'mint' },
];

export default function RoundsBoard() {
  return (
    <div className={styles.board}>
      {rounds.map(r => (
        <div key={r.name} className={`${styles.card} ${styles[r.accent]}`}>
          <div className={styles.head}>
            <h4 className={styles.title}>{r.name}</h4>
            <span className={styles.len}>{r.length}</span>
          </div>
          <p className={styles.focus}>{r.focus}</p>
        </div>
      ))}
    </div>
  );
}
