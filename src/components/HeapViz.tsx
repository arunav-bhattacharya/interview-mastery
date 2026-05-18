import React from 'react';
import VizFrame from './VizFrame';
import VizLegend from './VizLegend';
import styles from './TreeViz.module.css';

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
      title="Min-Heap · same data, two views"
      caption="Heap invariant: every parent is ≤ its children. Because the tree is always complete (filled left-to-right), we can store it in an array."
    >
      <VizLegend items={[
        { swatch: '#4f46e5', label: 'root (always the minimum)' },
        { swatch: 'rgba(79, 70, 229, 0.22)', label: 'internal / leaf nodes' },
      ]} />

      <svg viewBox="0 0 700 260" className={styles.svg} role="img">
        {edges.map(([a, b], i) => (
          <line key={i} x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y} className={styles.edge} />
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
        alignItems: 'center',
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
            position: 'relative',
          }}>
            {v}
            <span style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, 4px)',
              fontSize: '0.65rem',
              color: 'var(--im-muted)',
              fontWeight: 400,
            }}>[{i}]</span>
          </span>
        ))}
      </div>

      <div style={{
        marginTop: 36,
        padding: '10px 14px',
        background: 'var(--im-surface-2)',
        border: '1px solid var(--im-border)',
        borderRadius: 10,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: '0.85rem',
        color: 'var(--im-fg-2)',
        lineHeight: 1.7,
      }}>
        <div>parent(i) = (i − 1) / 2 &nbsp;·&nbsp; left(i) = 2i + 1 &nbsp;·&nbsp; right(i) = 2i + 2</div>
        <div>example: node at index 4 has value <b style={{ color: 'var(--im-fg)' }}>{heap[4]}</b>;
          its parent is at (4 − 1) / 2 = 1, value <b style={{ color: 'var(--im-fg)' }}>{heap[1]}</b>. Parent ≤ child ✓</div>
      </div>
    </VizFrame>
  );
}
