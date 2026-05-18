import React, { useMemo, useState } from 'react';
import VizFrame from './VizFrame';
import VizLegend from './VizLegend';
import styles from './TreeViz.module.css';

interface TrieNode { ch: string; x: number; y: number; word?: boolean; children: number[] }

// Stored words: cat, car, cap, can, do, dog
const tree: TrieNode[] = [
  { ch: '·', x: 350, y: 30,  children: [1, 8] },                  // 0 root
  { ch: 'c', x: 180, y: 95,  children: [2] },                     // 1 c
  { ch: 'a', x: 180, y: 160, children: [3, 4, 5, 6] },            // 2 ca
  { ch: 't', x: 60,  y: 230, word: true, children: [] },          // 3 cat
  { ch: 'r', x: 140, y: 230, word: true, children: [] },          // 4 car
  { ch: 'p', x: 220, y: 230, word: true, children: [] },          // 5 cap
  { ch: 'n', x: 300, y: 230, word: true, children: [] },          // 6 can
  { ch: '',  x: 0,   y: 0,   children: [] },                      // placeholder
  { ch: 'd', x: 520, y: 95,  children: [9] },                     // 8 d
  { ch: 'o', x: 520, y: 160, word: true, children: [10] },        // 9 do
  { ch: 'g', x: 520, y: 230, word: true, children: [] },          // 10 dog
];

function pathFor(prefix: string): number[] {
  if (!prefix) return [0];
  const path: number[] = [0];
  let cur = 0;
  for (const ch of prefix.toLowerCase()) {
    const childId = tree[cur].children.find(cid => tree[cid].ch === ch);
    if (childId === undefined) return [];
    path.push(childId);
    cur = childId;
  }
  return path;
}

export default function TrieViz() {
  const [prefix, setPrefix] = useState('ca');
  const path = useMemo(() => pathFor(prefix), [prefix]);
  const pathSet = new Set(path);
  const endNode = path[path.length - 1];
  const isWord = endNode !== undefined && tree[endNode]?.word === true;
  const found = path.length > 0;

  const edges: Array<[TrieNode, TrieNode]> = [];
  tree.forEach((n, i) => n.children.forEach(c => {
    if (tree[c].ch !== '') edges.push([n, tree[c]]);
  }));

  return (
    <VizFrame
      title="Trie · type a prefix and watch the path light up"
      caption="Stored words: cat, car, cap, can, do, dog. Green-outlined nodes mark complete words. Try typing 'cap', 'do', or 'doge'."
    >
      <VizLegend items={[
        { swatch: '#4f46e5', label: 'nodes on the matched prefix path' },
        { swatch: '#10b981', label: 'terminal node = complete word' },
        { swatch: 'transparent', label: 'inactive', shape: 'ring' },
      ]} />

      <div className={styles.searchBar}>
        <label className={styles.searchLabel} htmlFor="trie-input">prefix:</label>
        <input
          id="trie-input"
          className={styles.searchInput}
          value={prefix}
          onChange={e => setPrefix(e.target.value.replace(/[^a-zA-Z]/g, ''))}
          placeholder="type letters…"
          maxLength={6}
          autoComplete="off"
        />
        <span className={styles.searchVerdict}>
          {!prefix ? 'enter a prefix to query' :
           !found ? 'no path — this prefix is not stored' :
           isWord ? 'prefix matches a stored word ✓' : 'prefix exists; not yet a full word'}
        </span>
      </div>

      <svg viewBox="0 0 700 280" className={styles.svg} role="img">
        {edges.map(([a, b], i) => {
          const ai = tree.indexOf(a);
          const bi = tree.indexOf(b);
          const onPath = pathSet.has(ai) && pathSet.has(bi);
          return (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              className={onPath ? styles.edgeActive : styles.edge}
            />
          );
        })}
        {tree.map((n, i) => n.ch !== '' && (
          <g key={i}>
            <circle
              cx={n.x} cy={n.y} r={22}
              fill={
                pathSet.has(i) && i === endNode && isWord ? 'rgba(16, 185, 129, 0.32)' :
                pathSet.has(i) ? 'rgba(79, 70, 229, 0.30)' :
                n.word ? 'rgba(16, 185, 129, 0.10)' :
                'var(--im-surface)'
              }
              stroke={
                pathSet.has(i) ? 'var(--im-accent)' :
                n.word ? '#10b981' :
                'var(--im-border)'
              }
              strokeWidth={n.word || pathSet.has(i) ? 2.5 : 2}
            />
            <text x={n.x} y={n.y + 5} textAnchor="middle" className={styles.text}>{n.ch}</text>
          </g>
        ))}
      </svg>
    </VizFrame>
  );
}
