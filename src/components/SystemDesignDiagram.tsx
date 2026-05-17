import React from 'react';
import VizFrame from './VizFrame';
import styles from './SystemDesignDiagram.module.css';

interface Box { id: string; label: string; sub?: string; tone?: 'edge' | 'app' | 'data' | 'queue' }

const layers: { name: string; boxes: Box[] }[] = [
  { name: 'Clients',     boxes: [{ id: 'web', label: 'Web', tone: 'edge' }, { id: 'mob', label: 'Mobile', tone: 'edge' }] },
  { name: 'Edge',        boxes: [{ id: 'cdn', label: 'CDN', tone: 'edge' }, { id: 'lb',  label: 'Load Balancer', tone: 'edge' }] },
  { name: 'App tier',    boxes: [{ id: 'api1', label: 'API · stateless', sub: 'horizontally scaled', tone: 'app' }] },
  { name: 'Async',       boxes: [{ id: 'q',   label: 'Queue', sub: 'durable buffer', tone: 'queue' }, { id: 'w', label: 'Workers', tone: 'app' }] },
  { name: 'Data',        boxes: [{ id: 'cache', label: 'Cache · Redis', sub: 'hot reads', tone: 'data' }, { id: 'db', label: 'Primary DB', sub: 'replica fan-out', tone: 'data' }, { id: 'obj', label: 'Object store', tone: 'data' }] },
];

export default function SystemDesignDiagram() {
  return (
    <VizFrame
      title="Reference architecture"
      caption="A typical interview-grade architecture: stateless app tier behind a load balancer, async work via a queue, mixed data tier (cache + primary DB + object store)."
    >
      <div className={styles.stack}>
        {layers.map((layer, i) => (
          <div key={layer.name} className={styles.layer}>
            <div className={styles.layerLabel}>{layer.name}</div>
            <div className={styles.layerBoxes}>
              {layer.boxes.map(b => (
                <div key={b.id} className={`${styles.box} ${styles[b.tone || 'app']}`}>
                  <div className={styles.boxLabel}>{b.label}</div>
                  {b.sub ? <div className={styles.boxSub}>{b.sub}</div> : null}
                </div>
              ))}
            </div>
            {i < layers.length - 1 ? <div className={styles.connector} aria-hidden /> : null}
          </div>
        ))}
      </div>
    </VizFrame>
  );
}
