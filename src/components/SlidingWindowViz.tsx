import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import VizLegend from './VizLegend';
import VizState from './VizState';
import styles from './ArrayViz.module.css';

type Step = {
  l: number;
  r: number;
  sum: number;
  best: number;
  entered?: number;
  left?: number;
  caption: string;
};

function buildSteps(arr: number[], k: number): Step[] {
  const steps: Step[] = [];
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let best = sum;
  steps.push({
    l: 0, r: k - 1, sum, best,
    caption: `Build the initial window [0..${k - 1}]. Sum = ${sum}. This becomes our baseline best.`,
  });
  for (let r = k; r < arr.length; r++) {
    const entered = arr[r];
    const left = arr[r - k];
    sum += entered - left;
    best = Math.max(best, sum);
    steps.push({
      l: r - k + 1, r, sum, best, entered, left,
      caption: `Slide one step right. ${entered} enters the window, ${left} leaves. New sum = ${sum - entered + left} + ${entered} − ${left} = ${sum}. best = ${best}.`,
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
    }, 1100);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const cur = steps[step];

  return (
    <VizFrame title={`Sliding Window · max sum of any ${k} consecutive elements`} caption={cur.caption}>
      <VizLegend items={[
        { swatch: '#4f46e5', label: `current window of size ${k}` },
        { swatch: '#10b981', label: 'value entering (+)' },
        { swatch: '#ef4444', label: 'value leaving (−)' },
      ]} />

      <div className={styles.array}>
        {arr.map((v, i) => {
          const inWindow = i >= cur.l && i <= cur.r;
          const edge = i === cur.l || i === cur.r;
          const isEntered = step > 0 && i === cur.r;
          const isLeft = step > 0 && i === cur.l - 1;
          return (
            <div
              key={i}
              className={[
                styles.cell,
                inWindow ? styles.window : '',
                edge && inWindow ? styles.windowEdge : '',
                isEntered ? styles.entered : '',
                isLeft ? styles.leftDrop : '',
              ].filter(Boolean).join(' ')}
            >
              <span className={styles.value}>{v}</span>
              <span className={styles.index}>{i}</span>
            </div>
          );
        })}
      </div>

      <VizState rows={[
        { label: 'window', value: `[${cur.l} .. ${cur.r}]`, tone: 'accent' },
        { label: 'current sum', value: cur.sum, tone: 'accent' },
        { label: 'best so far', value: cur.best, tone: 'success' },
        { label: 'entered', value: cur.entered ?? '—', tone: 'success' },
        { label: 'left', value: cur.left ?? '—', tone: 'warn' },
      ]} />

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
