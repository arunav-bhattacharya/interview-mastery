import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import VizLegend from './VizLegend';
import styles from './TreeViz.module.css';

interface Node { id: number; value: number; x: number; y: number; children?: number[] }

const nodes: Node[] = [
  { id: 0, value: 1, x: 350, y: 30,  children: [1, 2] },
  { id: 1, value: 2, x: 180, y: 110, children: [3, 4] },
  { id: 2, value: 3, x: 520, y: 110, children: [5, 6] },
  { id: 3, value: 4, x: 90,  y: 200 },
  { id: 4, value: 5, x: 250, y: 200 },
  { id: 5, value: 6, x: 440, y: 200 },
  { id: 6, value: 7, x: 600, y: 200 },
];

interface Frame {
  visited: number[];        // ids in visit order so far
  current: number;          // the id just popped
  frontier: number[];       // remaining queue / stack contents
  caption: string;
}

function runBfs(): Frame[] {
  const frames: Frame[] = [];
  const visited: number[] = [];
  const q: number[] = [0];
  frames.push({
    visited: [], current: -1, frontier: [...q],
    caption: 'BFS uses a queue. Push the root and start.',
  });
  while (q.length) {
    const u = q.shift()!;
    visited.push(u);
    const kids = nodes[u].children ?? [];
    q.push(...kids);
    frames.push({
      visited: [...visited], current: u, frontier: [...q],
      caption: kids.length
        ? `Pop ${nodes[u].value} from the front. Enqueue its children: ${kids.map(c => nodes[c].value).join(', ')}.`
        : `Pop leaf ${nodes[u].value}. No children to enqueue.`,
    });
  }
  return frames;
}

function runDfs(): Frame[] {
  const frames: Frame[] = [];
  const visited: number[] = [];
  const stack: number[] = [0];
  frames.push({
    visited: [], current: -1, frontier: [...stack],
    caption: 'DFS uses a stack (or recursion). Push the root and start.',
  });
  while (stack.length) {
    const u = stack.pop()!;
    visited.push(u);
    const kids = (nodes[u].children ?? []).slice().reverse(); // pre-order
    stack.push(...kids);
    frames.push({
      visited: [...visited], current: u, frontier: [...stack],
      caption: kids.length
        ? `Pop ${nodes[u].value} from the top. Push children (right first so left runs first): ${kids.reverse().map(c => nodes[c].value).join(', ')}.`
        : `Pop leaf ${nodes[u].value}. Nothing more to push.`,
    });
  }
  return frames;
}

function Inner() {
  const [mode, setMode] = useState<'bfs' | 'dfs'>('bfs');
  const frames = useMemo(() => (mode === 'bfs' ? runBfs() : runDfs()), [mode]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setStep(0); setPlaying(false); }, [mode]);

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
  const visitedSet = new Set(cur.visited);
  const edges: Array<[Node, Node]> = [];
  nodes.forEach(n => n.children?.forEach(cid => edges.push([n, nodes[cid]])));

  return (
    <VizFrame
      title={`${mode.toUpperCase()} traversal · step through the ${mode === 'bfs' ? 'queue' : 'stack'}`}
      caption={cur.caption}
    >
      <div className={styles.modeRow}>
        <button
          className={`${styles.modeBtn} ${mode === 'bfs' ? styles.active : ''}`}
          onClick={() => setMode('bfs')}
        >BFS (queue · level-by-level)</button>
        <button
          className={`${styles.modeBtn} ${mode === 'dfs' ? styles.active : ''}`}
          onClick={() => setMode('dfs')}
        >DFS (stack · depth-first)</button>
      </div>

      <VizLegend items={[
        { swatch: '#4f46e5', label: 'current node' },
        { swatch: 'rgba(79, 70, 229, 0.22)', label: 'visited' },
        { swatch: 'transparent', label: 'unvisited', shape: 'ring' },
      ]} />

      <div className={styles.svgRow}>
        <svg viewBox="0 0 700 260" className={styles.svg} role="img">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              className={visitedSet.has(a.id) && visitedSet.has(b.id) ? styles.edgeActive : styles.edge}
            />
          ))}
          {nodes.map(n => (
            <g key={n.id}>
              <circle
                cx={n.x} cy={n.y} r={24}
                className={
                  n.id === cur.current ? styles.nodeCurrent :
                  visitedSet.has(n.id) ? styles.nodeVisited :
                  styles.node
                }
              />
              <text x={n.x} y={n.y + 5} textAnchor="middle" className={styles.text}>{n.value}</text>
            </g>
          ))}
        </svg>

        <aside className={styles.sidePanel}>
          <div className={styles.panelTitle}>{mode === 'bfs' ? 'queue (front → back)' : 'stack (top ← bottom)'}</div>
          <div className={styles.frontier}>
            {(mode === 'bfs' ? cur.frontier : [...cur.frontier].reverse()).map((id, i) => (
              <span key={i} className={styles.frontierItem}>{nodes[id].value}</span>
            ))}
            {cur.frontier.length === 0 ? <span className={styles.empty}>empty</span> : null}
          </div>
          <div className={styles.panelTitle} style={{ marginTop: 14 }}>visit order</div>
          <div className={styles.frontier}>
            {cur.visited.map((id, i) => (
              <span key={i} className={`${styles.frontierItem} ${styles.visitedChip}`}>{nodes[id].value}</span>
            ))}
            {cur.visited.length === 0 ? <span className={styles.empty}>—</span> : null}
          </div>
        </aside>
      </div>

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

export default function TreeViz() {
  return <BrowserOnly>{() => <Inner />}</BrowserOnly>;
}
