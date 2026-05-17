import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import styles from './ArrayViz.module.css';

type Step = { l: number; r: number; sum: number; best: number; caption: string };

function buildSteps(arr: number[], k: number): Step[] {
  const steps: Step[] = [];
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let best = sum;
  steps.push({ l: 0, r: k - 1, sum, best, caption: `Initial window [0..${k - 1}] sum=${sum}.` });
  for (let r = k; r < arr.length; r++) {
    sum += arr[r] - arr[r - k];
    best = Math.max(best, sum);
    steps.push({
      l: r - k + 1, r, sum, best,
      caption: `Slide right: +${arr[r]} -${arr[r - k]} → sum=${sum}, best=${best}.`,
    });
  }
  return steps;
}

function Inner() {
  const arr = useMemo(() => [4, 2, 1, 7, 8, 1, 2, 8, 1, 0], []);
  const k = 3;
  const steps = useMemo(() => buildSteps(arr, k), [arr]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 950);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const cur = steps[step];

  return (
    <VizFrame title={`Sliding Window · Max sum of any ${k} consecutive`} caption={cur.caption}>
      <div className={styles.array}>
        {arr.map((v, i) => {
          const inWindow = i >= cur.l && i <= cur.r;
          const edge = i === cur.l || i === cur.r;
          return (
            <div
              key={i}
              className={[
                styles.cell,
                inWindow ? styles.window : '',
                edge && inWindow ? styles.windowEdge : '',
              ].filter(Boolean).join(' ')}
            >
              <span className={styles.value}>{v}</span>
              <span className={styles.index}>{i}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.summary}>
        <span>window: [<b>{cur.l}</b>..<b>{cur.r}</b>]</span>
        <span>sum: <b>{cur.sum}</b></span>
        <span>best so far: <b>{cur.best}</b></span>
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

export default function SlidingWindowViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
