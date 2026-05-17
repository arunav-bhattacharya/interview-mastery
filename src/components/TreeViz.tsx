import React, { useEffect, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import VizFrame from './VizFrame';
import VizControls from './VizControls';
import styles from './TreeViz.module.css';

interface Node {
  id: number; value: number; x: number; y: number; children?: number[];
}

// Hard-coded balanced tree for demo
const nodes: Node[] = [
  { id: 0, value: 1, x: 350, y: 30,  children: [1, 2] },
  { id: 1, value: 2, x: 180, y: 110, children: [3, 4] },
  { id: 2, value: 3, x: 520, y: 110, children: [5, 6] },
  { id: 3, value: 4, x: 90,  y: 200 },
  { id: 4, value: 5, x: 250, y: 200 },
  { id: 5, value: 6, x: 440, y: 200 },
  { id: 6, value: 7, x: 600, y: 200 },
];

function bfsOrder(): number[] {
  const order: number[] = [];
  const q: number[] = [0];
  while (q.length) {
    const id = q.shift()!;
    order.push(id);
    const n = nodes[id];
    if (n.children) q.push(...n.children);
  }
  return order;
}

function dfsOrder(): number[] {
  const order: number[] = [];
  const visit = (id: number) => {
    order.push(id);
    const n = nodes[id];
    if (n.children) n.children.forEach(visit);
  };
  visit(0);
  return order;
}

function Inner() {
  const [mode, setMode] = useState<'bfs' | 'dfs'>('bfs');
  const order = useMemo(() => (mode === 'bfs' ? bfsOrder() : dfsOrder()), [mode]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setStep(0); setPlaying(false); }, [mode]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep(s => {
        if (s >= order.length - 1) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 950);
    return () => clearInterval(id);
  }, [playing, order.length]);

  const visited = new Set(order.slice(0, step + 1));
  const cur = order[step];

  const edges: Array<[Node, Node]> = [];
  nodes.forEach(n => n.children?.forEach(cid => edges.push([n, nodes[cid]])));

  return (
    <VizFrame
      title={`${mode.toUpperCase()} traversal`}
      caption={`Visit order: ${order.slice(0, step + 1).map(i => nodes[i].value).join(' → ')}`}
    >
      <div className={styles.modeRow}>
        <button
          className={`${styles.modeBtn} ${mode === 'bfs' ? styles.active : ''}`}
          onClick={() => setMode('bfs')}
        >BFS (queue)</button>
        <button
          className={`${styles.modeBtn} ${mode === 'dfs' ? styles.active : ''}`}
          onClick={() => setMode('dfs')}
        >DFS (stack / recursion)</button>
      </div>
      <svg viewBox="0 0 700 260" className={styles.svg} role="img">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            className={
              visited.has(a.id) && visited.has(b.id) ? styles.edgeActive : styles.edge
            }
          />
        ))}
        {nodes.map(n => (
          <g key={n.id}>
            <circle
              cx={n.x} cy={n.y} r={24}
              className={
                n.id === cur ? styles.nodeCurrent :
                visited.has(n.id) ? styles.nodeVisited :
                styles.node
              }
            />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className={styles.text}>{n.value}</text>
          </g>
        ))}
      </svg>
      <VizControls
        step={step}
        total={order.length}
        onPrev={() => setStep(s => Math.max(0, s - 1))}
        onNext={() => setStep(s => Math.min(order.length - 1, s + 1))}
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
