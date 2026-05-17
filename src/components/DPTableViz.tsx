import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import styles from './DPTableViz.module.css';

interface Cell { value: number; from?: string }

// Climbing stairs DP: dp[i] = dp[i-1] + dp[i-2]
function buildSteps(n: number) {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  const steps: { dp: number[]; i: number; caption: string }[] = [
    { dp: [...dp], i: 0, caption: 'Base: dp[0]=1 (one way to stand still)' },
    { dp: [...dp], i: 1, caption: 'Base: dp[1]=1 (one way to climb one stair)' },
  ];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({ dp: [...dp], i, caption: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}` });
  }
  return steps;
}

function Inner() {
  const n = 8;
  const steps = useMemo(() => buildSteps(n), []);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const cur = steps[step];

  return (
    <VizFrame title={`DP · Climbing ${n} stairs (1 or 2 steps)`} caption={cur.caption}>
      <div className={styles.table}>
        {cur.dp.map((v, i) => (
          <div
            key={i}
            className={[
              styles.cell,
              i === cur.i ? styles.active : '',
              i < cur.i ? styles.done : '',
              i > cur.i ? styles.pending : '',
              i === cur.i - 1 || i === cur.i - 2 ? styles.dep : '',
            ].filter(Boolean).join(' ')}
          >
            <div className={styles.idx}>dp[{i}]</div>
            <div className={styles.value}>{v || '·'}</div>
          </div>
        ))}
      </div>
      <VizControls
        step={step}
        total={steps.length}
        onPrev={() => setStep(s => Math.max(0, s - 1))}
        onNext={() => setStep(s => Math.min(steps.length - 1, s + 1))}
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
