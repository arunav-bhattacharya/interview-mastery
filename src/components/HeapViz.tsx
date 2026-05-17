import React from 'react';
import VizFrame from './VizFrame';
import styles from './TreeViz.module.css';

// Static visual: a min-heap drawn as both tree and array.
const heap = [1, 3, 6, 5, 9, 8, 7];
const positions = [
  { x: 350, y: 30 },
  { x: 180, y: 110 },
  { x: 520, y: 110 },
  { x: 90,  y: 200 },
  { x: 250, y: 200 },
  { x: 440, y: 200 },
  { x: 600, y: 200 },
];

export default function HeapViz() {
  const edges: Array<[number, number]> = [];
  heap.forEach((_, i) => {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < heap.length) edges.push([i, l]);
    if (r < heap.length) edges.push([i, r]);
  });

  return (
    <VizFrame
      title="Min-Heap layout"
      caption="A heap is a complete binary tree stored compactly in an array. Parent of index i is (i-1)/2; children are 2i+1 and 2i+2."
    >
      <svg viewBox="0 0 700 260" className={styles.svg} role="img">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={positions[a].x} y1={positions[a].y}
            x2={positions[b].x} y2={positions[b].y}
            className={styles.edge}
          />
        ))}
        {heap.map((v, i) => (
          <g key={i}>
            <circle
              cx={positions[i].x} cy={positions[i].y} r={24}
              className={i === 0 ? styles.nodeCurrent : styles.nodeVisited}
            />
            <text x={positions[i].x} y={positions[i].y + 5} textAnchor="middle" className={styles.text}>{v}</text>
          </g>
        ))}
      </svg>
      <div style={{
        marginTop: 14,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: '0.95rem',
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
      }}>
        <span style={{ color: 'var(--im-muted)' }}>array:</span>
        {heap.map((v, i) => (
          <span key={i} style={{
            padding: '4px 10px',
            background: i === 0 ? 'var(--im-accent-soft)' : 'var(--im-surface-2)',
            color: i === 0 ? 'var(--im-accent-fg)' : 'var(--im-fg)',
            border: i === 0 ? '1px solid var(--im-accent)' : '1px solid var(--im-border)',
            borderRadius: 6,
            fontWeight: 600,
          }}>{v}</span>
        ))}
      </div>
    </VizFrame>
  );
}
