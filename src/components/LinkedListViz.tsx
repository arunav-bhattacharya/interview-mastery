import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import VizLegend from './VizLegend';
import VizState from './VizState';
import styles from './LinkedListViz.module.css';

interface Step {
  // The order of node values as currently linked, head-first.
  list: number[];
  // Indices in `list` where the pointers point. -1 means null.
  prev: number;
  curr: number;
  next: number;
  // Whether the arrow before `curr` has been flipped.
  flipped: boolean[];
  caption: string;
}

function buildSteps(initial: number[]): Step[] {
  const list = [...initial];
  const n = list.length;
  const flipped: boolean[] = new Array(Math.max(n - 1, 0)).fill(false);

  const steps: Step[] = [];
  steps.push({
    list: [...list], prev: -1, curr: 0, next: 1, flipped: [...flipped],
    caption: 'Start. prev = null, curr = head, next = curr.next. We will walk forward, flipping each arrow as we go.',
  });

  for (let i = 0; i < n; i++) {
    if (i > 0) flipped[i - 1] = true;
    const prevIdx = i - 1;
    const nextIdx = i + 1 < n ? i + 1 : -1;
    steps.push({
      list: [...list], prev: prevIdx, curr: i, next: nextIdx, flipped: [...flipped],
      caption: i + 1 < n
        ? `Save next = node ${list[i + 1] ?? '?'}. Flip ${list[i]} → previous (${prevIdx === -1 ? 'null' : list[prevIdx]}). Advance prev and curr forward.`
        : `Flip the last node ${list[i]} → previous (${list[prevIdx]}). curr will become null next; we are done.`,
    });
  }

  // Final reversed state
  steps.push({
    list: list.slice().reverse(), prev: n - 1, curr: -1, next: -1,
    flipped: new Array(Math.max(n - 1, 0)).fill(true),
    caption: 'curr is null. prev points at the new head. Return prev. O(n) time, O(1) extra space.',
  });

  return steps;
}

function Inner() {
  const initial = useMemo(() => [1, 2, 3, 4, 5], []);
  const steps = useMemo(() => buildSteps(initial), [initial]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const cur = steps[step];
  const isFinal = step === steps.length - 1;

  return (
    <VizFrame title="Reverse a Linked List · step through the pointer flips" caption={cur.caption}>
      <VizLegend items={[
        { swatch: '#4f46e5', label: 'prev (where curr.next will point)' },
        { swatch: '#0891b2', label: 'curr (the node being processed)' },
        { swatch: '#a78bfa', label: 'next (saved before we overwrite)' },
        { swatch: 'transparent', label: 'flipped arrow ←', shape: 'arrow' },
      ]} />

      <div className={styles.list}>
        {cur.list.map((v, i) => {
          const isPrev = !isFinal && i === cur.prev;
          const isCurr = !isFinal && i === cur.curr;
          const isNext = !isFinal && i === cur.next;
          return (
            <React.Fragment key={i}>
              <div className={styles.nodeWrap}>
                <div className={styles.labels}>
                  {isPrev ? <span className={`${styles.tag} ${styles.tagPrev}`}>prev</span> : null}
                  {isCurr ? <span className={`${styles.tag} ${styles.tagCurr}`}>curr</span> : null}
                  {isNext ? <span className={`${styles.tag} ${styles.tagNext}`}>next</span> : null}
                  {isFinal && i === 0 ? <span className={`${styles.tag} ${styles.tagPrev}`}>new head</span> : null}
                </div>
                <div className={[
                  styles.node,
                  isCurr ? styles.active : '',
                  isPrev ? styles.prevNode : '',
                  isNext ? styles.nextNode : '',
                ].filter(Boolean).join(' ')}>
                  <span className={styles.value}>{v}</span>
                </div>
              </div>
              {i < cur.list.length - 1 ? (
                <div className={`${styles.arrow} ${cur.flipped[i] || isFinal ? styles.reversed : ''}`}>
                  <span>{cur.flipped[i] || isFinal ? '←' : '→'}</span>
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
        <div className={styles.nullTag}>null</div>
      </div>

      <VizState rows={[
        { label: 'prev', value: cur.prev === -1 ? 'null' : cur.list[cur.prev], tone: 'accent' },
        { label: 'curr', value: cur.curr === -1 ? 'null' : cur.list[cur.curr], tone: 'accent' },
        { label: 'next', value: cur.next === -1 ? 'null' : cur.list[cur.next], tone: 'muted' },
        { label: 'step', value: `${step + 1} of ${steps.length}` },
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

export default function LinkedListViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
