import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './ProgressTracker.module.css';

const STORAGE_KEY = 'im-streak-v1';

interface StreakState {
  lastDay: string;
  streak: number;
  total: number;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function dayDiff(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00Z').getTime();
  const db = new Date(b + 'T00:00:00Z').getTime();
  return Math.round((da - db) / 86_400_000);
}

function load(): StreakState {
  if (typeof window === 'undefined') return { lastDay: '', streak: 0, total: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lastDay: '', streak: 0, total: 0 };
    return JSON.parse(raw) as StreakState;
  } catch {
    return { lastDay: '', streak: 0, total: 0 };
  }
}

function save(s: StreakState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

function Inner() {
  const [state, setState] = useState<StreakState>(() => load());

  useEffect(() => { setState(load()); }, []);

  const markToday = () => {
    const today = todayKey();
    setState(prev => {
      if (prev.lastDay === today) return prev;
      const diff = prev.lastDay ? dayDiff(today, prev.lastDay) : Infinity;
      const next: StreakState = {
        lastDay: today,
        streak: diff === 1 ? prev.streak + 1 : 1,
        total: prev.total + 1,
      };
      save(next);
      return next;
    });
  };

  const reset = () => {
    const next = { lastDay: '', streak: 0, total: 0 };
    save(next);
    setState(next);
  };

  const checkedToday = state.lastDay === todayKey();

  return (
    <div className={styles.wrap}>
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{state.streak}</div>
          <div className={styles.statLabel}>day streak</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{state.total}</div>
          <div className={styles.statLabel}>total check-ins</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{state.lastDay || '—'}</div>
          <div className={styles.statLabel}>last study day</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.primary}
          onClick={markToday}
          disabled={checkedToday}
        >
          {checkedToday ? '✓ Logged today' : 'Mark today as studied'}
        </button>
        <button className={styles.ghost} onClick={reset}>Reset</button>
      </div>
      <p className={styles.note}>
        Tracked locally in your browser. Nothing leaves your device.
      </p>
    </div>
  );
}

export default function ProgressTracker() {
  return <BrowserOnly fallback={<div className={styles.wrap} />}>{() => <Inner />}</BrowserOnly>;
}
