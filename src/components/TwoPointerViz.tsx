import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import styles from './ArrayViz.module.css';

type Step = {
  l: number; r: number; sum: number; match: boolean; done: boolean; caption: string;
};

function buildSteps(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  let l = 0, r = arr.length - 1;
  steps.push({ l, r, sum: arr[l] + arr[r], match: false, done: false,
    caption: `Start: left=${l}, right=${r}, target=${target}.` });
  while (l < r) {
    const sum = arr[l] + arr[r];
    if (sum === target) {
      steps.push({ l, r, sum, match: true, done: true,
        caption: `arr[${l}] + arr[${r}] = ${sum} → match.` });
      break;
    }
    if (sum < target) {
      steps.push({ l, r, sum, match: false, done: false,
        caption: `sum=${sum} < ${target}, advance left.` });
      l++;
    } else {
      steps.push({ l, r, sum, match: false, done: false,
        caption: `sum=${sum} > ${target}, retreat right.` });
      r--;
    }
  }
  if (l >= r && !steps[steps.length - 1].match) {
    steps.push({ l, r, sum: 0, match: false, done: true,
      caption: 'Pointers crossed — no pair found.' });
  }
  return steps;
}

function Inner() {
  const arr = useMemo(() => [1, 3, 4, 6, 8, 11], []);
  const target = 14;
  const steps = useMemo(() => buildSteps(arr, target), [arr]);
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
    <VizFrame title={`Two-Pointer · Pair sum to ${target}`} caption={cur.caption}>
      <div className={styles.array}>
        {arr.map((v, i) => (
          <div
            key={i}
            className={[
              styles.cell,
              i === cur.l ? styles.left : '',
              i === cur.r ? styles.right : '',
              cur.match && (i === cur.l || i === cur.r) ? styles.match : '',
            ].filter(Boolean).join(' ')}
          >
            <span className={styles.value}>{v}</span>
            <span className={styles.index}>{i}</span>
          </div>
        ))}
      </div>
      <div className={styles.pointers}>
        <span className={styles.tagLeft}>L</span> = {cur.l} &nbsp;·&nbsp;
        <span className={styles.tagRight}>R</span> = {cur.r} &nbsp;·&nbsp;
        sum = {arr[cur.l] + arr[cur.r]}
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

export default function TwoPointerViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
