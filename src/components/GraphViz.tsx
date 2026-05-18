import React from 'react';
import VizFrame from './VizFrame';
import VizLegend from './VizLegend';
import styles from './TreeViz.module.css';

const nodes = [
  { id: 0, label: 'CS101', x: 90,  y: 110 },
  { id: 1, label: 'Algo',  x: 250, y: 50 },
  { id: 2, label: 'Data',  x: 250, y: 170 },
  { id: 3, label: 'OS',    x: 420, y: 80 },
  { id: 4, label: 'DB',    x: 420, y: 180 },
  { id: 5, label: 'Capstone', x: 590, y: 130 },
];

const edges: Array<[number, number]> = [
  [0, 1], [0, 2],
  [1, 3], [2, 3], [2, 4],
  [3, 5], [4, 5],
];

const topoOrder = [0, 1, 2, 3, 4, 5]; // one valid topological order

export default function GraphViz() {
  return (
    <VizFrame
      title="Directed Acyclic Graph · prerequisites you can topologically order"
      caption="Each arrow A → B reads 'A must come before B'. A topological order is any linear order consistent with every arrow."
    >
      <VizLegend items={[
        { swatch: '#4f46e5', label: 'course node' },
        { swatch: 'transparent', label: 'must-come-before edge', shape: 'arrow' },
      ]} />

      <svg viewBox="0 0 700 260" className={styles.svg} role="img">
        <defs>
          <marker id="arrowhead-graph" viewBox="0 0 10 10" refX="11" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--im-accent)" />
          </marker>
        </defs>
        {edges.map(([a, b], i) => {
          const A = nodes[a], B = nodes[b];
          return (
            <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke="var(--im-accent)" strokeWidth={2}
                  markerEnd="url(#arrowhead-graph)" />
          );
        })}
        {nodes.map(n => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={30} className={styles.nodeVisited} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className={styles.text}>{n.label}</text>
          </g>
        ))}
      </svg>

      <div style={{
        marginTop: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      }}>
        <span style={{
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--im-muted)',
        }}>topological order:</span>
        {topoOrder.map((id, i) => (
          <React.Fragment key={id}>
            <span style={{
              padding: '4px 10px',
              background: 'var(--im-accent-soft)',
              color: 'var(--im-accent-fg)',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: '0.85rem',
              border: '1px solid var(--im-border)',
            }}>{nodes[id].label}</span>
            {i < topoOrder.length - 1 ? <span style={{ color: 'var(--im-muted)' }}>→</span> : null}
          </React.Fragment>
        ))}
      </div>
    </VizFrame>
  );
}
