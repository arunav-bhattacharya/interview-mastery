import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import VizLegend from './VizLegend';
import VizState from './VizState';
import styles from './DPTableViz.module.css';

interface Frame {
  dp: number[];
  i: number;
  formula: string;
  caption: string;
}

function buildSteps(n: number): Frame[] {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  const frames: Frame[] = [
    { dp: [...dp], i: 0, formula: 'dp[0] = 1', caption: 'Base case: there is exactly one way to "climb" zero stairs — stand still.' },
    { dp: [...dp], i: 1, formula: 'dp[1] = 1', caption: 'Base case: only one way to climb one stair — take a single step.' },
  ];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    frames.push({
      dp: [...dp], i,
      formula: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      caption: `To reach stair ${i}, the last move was either +1 (from ${i - 1}) or +2 (from ${i - 2}). Add the ways from both prior states.`,
    });
  }
  return frames;
}

function Inner() {
  const n = 8;
  const frames = useMemo(() => buildSteps(n), []);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep(s => {
        if (s >= frames.length - 1) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 1100);
    return () => clearInterval(id);
  }, [playing, frames.length]);

  const cur = frames[step];

  return (
    <VizFrame title={`DP · Climbing ${n} stairs (steps of size 1 or 2)`} caption={cur.caption}>
      <VizLegend items={[
        { swatch: '#4f46e5', label: 'cell being filled' },
        { swatch: 'rgba(99, 102, 241, 0.16)', label: 'cells it depends on (i−1, i−2)' },
        { swatch: 'rgba(16, 185, 129, 0.14)', label: 'already filled' },
        { swatch: 'var(--im-surface-2)', label: 'not filled yet' },
      ]} />

      <div className={styles.formula}>{cur.formula}</div>

      <div className={styles.table}>
        {cur.dp.map((v, i) => (
          <div
            key={i}
            className={[
              styles.cell,
              i === cur.i ? styles.active : '',
              i < cur.i ? styles.done : '',
              i > cur.i ? styles.pending : '',
              cur.i >= 2 && (i === cur.i - 1 || i === cur.i - 2) ? styles.dep : '',
            ].filter(Boolean).join(' ')}
          >
            <div className={styles.idx}>dp[{i}]</div>
            <div className={styles.value}>{v || '·'}</div>
          </div>
        ))}
      </div>

      <VizState rows={[
        { label: 'i', value: cur.i, tone: 'accent' },
        { label: 'dp[i-1]', value: cur.i >= 1 ? cur.dp[cur.i - 1] : '—' },
        { label: 'dp[i-2]', value: cur.i >= 2 ? cur.dp[cur.i - 2] : '—' },
        { label: 'dp[i]', value: cur.dp[cur.i], tone: 'success' },
        { label: 'progress', value: `${step + 1} / ${frames.length}` },
      ]} />

      <VizControls
        step={step}
        total={frames.length}
        onPrev={() => setStep(s => Math.max(0, s - 1))}
        onNext={() => setStep(s => Math.min(frames.length - 1, s + 1))}
        onReset={() => { setStep(0); setPlaying(false); }}
        playing={playing}
        onPlayToggle={() => setPlaying(p => !p)}
      />
    </VizFrame>
  );
}

export default function DPTableViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
