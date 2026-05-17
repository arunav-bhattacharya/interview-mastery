import React from 'react';
import VizFrame from './VizFrame';
import styles from './TreeViz.module.css';

interface TrieNode { ch: string; x: number; y: number; word?: boolean; children: number[] }

// Trie of: cat, car, cap, can, dog, do
const tree: TrieNode[] = [
  { ch: '·', x: 350, y: 30,  children: [1, 9] },        // root
  { ch: 'c', x: 180, y: 95,  children: [2] },           // c
  { ch: 'a', x: 180, y: 160, children: [3, 5, 6, 7] },  // ca
  { ch: 't', x: 60,  y: 230, word: true, children: [] },// cat
  { ch: '',  x: 0,   y: 0,   children: [] },            // placeholder
  { ch: 'r', x: 130, y: 230, word: true, children: [] },// car
  { ch: 'p', x: 220, y: 230, word: true, children: [] },// cap
  { ch: 'n', x: 310, y: 230, word: true, children: [] },// can
  { ch: '',  x: 0,   y: 0,   children: [] },
  { ch: 'd', x: 520, y: 95,  children: [10] },          // d
  { ch: 'o', x: 520, y: 160, word: true, children: [11] }, // do
  { ch: 'g', x: 520, y: 230, word: true, children: [] },// dog
];

export default function TrieViz() {
  const edges: Array<[TrieNode, TrieNode]> = [];
  tree.forEach(n => n.children.forEach(c => {
    if (tree[c].ch !== '') edges.push([n, tree[c]]);
  }));
  return (
    <VizFrame
      title="Trie · prefix tree"
      caption="Each node is a character; bold green outlines mark complete words. Stored: cat · car · cap · can · do · dog."
    >
      <svg viewBox="0 0 700 280" className={styles.svg} role="img">
        {edges.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={styles.edge} />
        ))}
        {tree.map((n, i) => n.ch !== '' && (
          <g key={i}>
            <circle
              cx={n.x} cy={n.y} r={22}
              fill={n.word ? 'rgba(16, 185, 129, 0.18)' : 'var(--im-surface)'}
              stroke={n.word ? '#10b981' : 'var(--im-border)'}
              strokeWidth={n.word ? 2.5 : 2}
            />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className={styles.text}>{n.ch}</text>
          </g>
        ))}
      </svg>
    </VizFrame>
  );
}
