import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import styles from './LinkedListViz.module.css';

interface Step {
  list: number[];
  highlight?: number[];
  arrows?: Array<[number, number]>;
  caption: string;
}

function reverseSteps(initial: number[]): Step[] {
  const n = initial.length;
  const steps: Step[] = [{ list: [...initial], caption: 'Start. Three pointers: prev=null, curr=head, next=?' }];
  const list = [...initial];
  for (let i = 0; i < n; i++) {
    steps.push({
      list: [...list],
      highlight: [i],
      caption: `Visit node ${list[i]} — flip its arrow to point at the previous node.`,
    });
  }
  steps.push({
    list: list.slice().reverse(),
    caption: 'Done. The list is now reversed in O(n) time, O(1) extra space.',
  });
  return steps;
}

function Inner() {
  const steps = useMemo(() => reverseSteps([1, 2, 3, 4, 5]), []);
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
    <VizFrame title="Reverse a Linked List" caption={cur.caption}>
      <div className={styles.list}>
        {cur.list.map((v, i) => (
          <React.Fragment key={i}>
            <div
              className={`${styles.node} ${cur.highlight?.includes(i) ? styles.active : ''}`}
            >
              <span className={styles.value}>{v}</span>
            </div>
            {i < cur.list.length - 1 ? (
              <div className={`${styles.arrow} ${step === steps.length - 1 ? styles.reversed : ''}`}>
                <span>{step === steps.length - 1 ? '←' : '→'}</span>
              </div>
            ) : null}
          </React.Fragment>
        ))}
        <div className={styles.nullTag}>null</div>
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

export default function LinkedListViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
