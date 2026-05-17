import React from 'react';
import styles from './VizControls.module.css';

interface Props {
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  playing?: boolean;
  onPlayToggle?: () => void;
  hint?: string;
}

export default function VizControls({
  step, total, onPrev, onNext, onReset, playing, onPlayToggle, hint,
}: Props) {
  return (
    <div className={styles.bar}>
      <button onClick={onReset} className={styles.btn} aria-label="Reset">⟲</button>
      <button onClick={onPrev} className={styles.btn} disabled={step === 0} aria-label="Previous">‹</button>
      {onPlayToggle ? (
        <button onClick={onPlayToggle} className={`${styles.btn} ${styles.play}`} aria-label="Play">
          {playing ? '❚❚' : '▶'}
        </button>
      ) : null}
      <button onClick={onNext} className={styles.btn} disabled={step >= total - 1} aria-label="Next">›</button>
      <span className={styles.counter}>{step + 1} / {total}</span>
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </div>
  );
}
