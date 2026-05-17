import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import styles from './ArrayViz.module.css';

type Step = { lo: number; hi: number; mid: number; verdict: 'lt' | 'gt' | 'eq' | 'none'; caption: string };

function build(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) {
      steps.push({ lo, hi, mid, verdict: 'eq', caption: `arr[${mid}] = ${target} → found at index ${mid}.` });
      return steps;
    }
    if (arr[mid] < target) {
      steps.push({ lo, hi, mid, verdict: 'lt', caption: `arr[${mid}]=${arr[mid]} < ${target}, search right half.` });
      lo = mid + 1;
    } else {
      steps.push({ lo, hi, mid, verdict: 'gt', caption: `arr[${mid}]=${arr[mid]} > ${target}, search left half.` });
      hi = mid - 1;
    }
  }
  steps.push({ lo, hi, mid: -1, verdict: 'none', caption: 'Range empty — target not present.' });
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
    }, 1100);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const cur = steps[step];

  return (
    <VizFrame title={`Binary Search · target = ${target}`} caption={cur.caption}>
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
