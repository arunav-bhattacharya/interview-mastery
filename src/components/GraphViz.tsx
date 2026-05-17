import React from 'react';
import VizFrame from './VizFrame';
import styles from './TreeViz.module.css';

// A small directed graph for topological-sort intuition (course prerequisites).
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

export default function GraphViz() {
  return (
    <VizFrame
      title="Directed Acyclic Graph · prerequisite chain"
      caption="A DAG of course dependencies. Topological order: CS101 → Algo, Data → OS, DB → Capstone."
    >
      <svg viewBox="0 0 700 260" className={styles.svg} role="img">
        <defs>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="11" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--im-accent)" />
          </marker>
        </defs>
        {edges.map(([a, b], i) => {
          const A = nodes[a], B = nodes[b];
          return (
            <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke="var(--im-accent)" strokeWidth={2}
                  markerEnd="url(#arrowhead)" />
          );
        })}
        {nodes.map(n => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={30} className={styles.nodeVisited} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className={styles.text}>{n.label}</text>
          </g>
        ))}
      </svg>
    </VizFrame>
  );
}
