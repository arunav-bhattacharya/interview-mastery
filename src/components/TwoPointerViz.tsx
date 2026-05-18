import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import VizLegend from './VizLegend';
import VizState from './VizState';
import styles from './ArrayViz.module.css';

type Verdict = 'eq' | 'lt' | 'gt' | 'none' | 'init';

interface Step {
  l: number;
  r: number;
  sum: number;
  verdict: Verdict;
  done: boolean;
  caption: string;
  decision: string;
}

function buildSteps(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  let l = 0, r = arr.length - 1;
  steps.push({
    l, r, sum: arr[l] + arr[r], verdict: 'init', done: false,
    caption: `Start with the widest window: left at index 0, right at index ${r}.`,
    decision: `Initial sum = ${arr[l]} + ${arr[r]} = ${arr[l] + arr[r]} · target = ${target}`,
  });
  while (l < r) {
    const sum = arr[l] + arr[r];
    if (sum === target) {
      steps.push({
        l, r, sum, verdict: 'eq', done: true,
        caption: `a[${l}] + a[${r}] equals the target — return this pair.`,
        decision: `${arr[l]} + ${arr[r]} = ${sum} == ${target} ✓ found`,
      });
      return steps;
    }
    if (sum < target) {
      steps.push({
        l, r, sum, verdict: 'lt', done: false,
        caption: `Sum is too small. Moving the left pointer right will increase it; right alone could only shrink it further.`,
        decision: `${arr[l]} + ${arr[r]} = ${sum} < ${target} → l++`,
      });
      l++;
    } else {
      steps.push({
        l, r, sum, verdict: 'gt', done: false,
        caption: `Sum is too big. Moving the right pointer left will decrease it; left alone could only grow it further.`,
        decision: `${arr[l]} + ${arr[r]} = ${sum} > ${target} → r--`,
      });
      r--;
    }
  }
  steps.push({
    l, r, sum: 0, verdict: 'none', done: true,
    caption: 'Pointers crossed — no pair sums to the target.',
    decision: 'no pair found',
  });
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
    }, 1300);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const cur = steps[step];

  return (
    <VizFrame title={`Two-Pointer · find a pair summing to ${target}`} caption={cur.caption}>
      <VizLegend items={[
        { swatch: '#6366f1', label: 'left pointer (L)' },
        { swatch: '#0891b2', label: 'right pointer (R)' },
        { swatch: '#10b981', label: 'matched pair' },
      ]} />

      <div className={styles.array}>
        {arr.map((v, i) => (
          <div
            key={i}
            className={[
              styles.cell,
              i === cur.l ? styles.left : '',
              i === cur.r ? styles.right : '',
              cur.verdict === 'eq' && (i === cur.l || i === cur.r) ? styles.match : '',
            ].filter(Boolean).join(' ')}
          >
            <span className={styles.value}>{v}</span>
            <span className={styles.index}>{i}</span>
          </div>
        ))}
      </div>

      <VizState rows={[
        { label: 'L (index)', value: cur.l, tone: 'accent' },
        { label: 'R (index)', value: cur.r, tone: 'accent' },
        { label: 'a[L] + a[R]', value: cur.sum },
        { label: 'target', value: target },
        { label: 'decision', value: cur.decision, tone: cur.verdict === 'eq' ? 'success' : 'muted', wide: true },
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

export default function TwoPointerViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
