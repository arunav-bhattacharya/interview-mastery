import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import VizLegend from './VizLegend';
import VizState from './VizState';
import styles from './ArrayViz.module.css';

type Verdict = 'eq' | 'lt' | 'gt' | 'none';

interface Step {
  lo: number;
  hi: number;
  mid: number;
  midVal: number;
  verdict: Verdict;
  caption: string;
  decision: string;
}

function build(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) {
      steps.push({
        lo, hi, mid, midVal: arr[mid], verdict: 'eq',
        caption: `Hit. The midpoint equals the target — return its index.`,
        decision: `a[${mid}] = ${arr[mid]} == ${target} ✓`,
      });
      return steps;
    }
    if (arr[mid] < target) {
      steps.push({
        lo, hi, mid, midVal: arr[mid], verdict: 'lt',
        caption: `Midpoint is too small. Everything ≤ mid is now useless — discard the left half by moving lo to mid + 1.`,
        decision: `a[${mid}] = ${arr[mid]} < ${target} → lo = mid + 1`,
      });
      lo = mid + 1;
    } else {
      steps.push({
        lo, hi, mid, midVal: arr[mid], verdict: 'gt',
        caption: `Midpoint is too big. Everything ≥ mid is now useless — discard the right half by moving hi to mid − 1.`,
        decision: `a[${mid}] = ${arr[mid]} > ${target} → hi = mid - 1`,
      });
      hi = mid - 1;
    }
  }
  steps.push({
    lo, hi, mid: -1, midVal: 0, verdict: 'none',
    caption: 'Range is empty (lo > hi). Target is not in the array.',
    decision: 'not found',
  });
  return steps;
}

function Inner() {
  const arr = useMemo(() => [1, 3, 5, 7, 9, 11, 14, 18, 22, 27, 33, 41], []);
  const target = 22;
  const steps = useMemo(() => build(arr, target), [arr]);
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
    <VizFrame title={`Binary Search · target = ${target}`} caption={cur.caption}>
      <VizLegend items={[
        { swatch: '#6366f1', label: 'lo (low bound)' },
        { swatch: '#0891b2', label: 'hi (high bound)' },
        { swatch: '#fbbf24', label: 'mid (being tested)' },
        { swatch: '#d1d5db', label: 'discarded' },
      ]} />

      <div className={styles.array}>
        {arr.map((v, i) => {
          const inRange = i >= cur.lo && i <= cur.hi;
          return (
            <div
              key={i}
              className={[
                styles.cell,
                !inRange ? styles.discarded : '',
                i === cur.lo && inRange ? styles.lo : '',
                i === cur.hi && inRange ? styles.hi : '',
                i === cur.mid ? styles.mid : '',
                i === cur.mid && cur.verdict === 'eq' ? styles.found : '',
              ].filter(Boolean).join(' ')}
            >
              <span className={styles.value}>{v}</span>
              <span className={styles.index}>{i}</span>
            </div>
          );
        })}
      </div>

      <VizState rows={[
        { label: 'lo', value: cur.lo, tone: 'accent' },
        { label: 'hi', value: cur.hi < cur.lo ? '—' : cur.hi, tone: 'accent' },
        { label: 'mid = (lo+hi)/2', value: cur.mid === -1 ? '—' : cur.mid },
        { label: 'a[mid]', value: cur.mid === -1 ? '—' : cur.midVal },
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

export default function BinarySearchViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
