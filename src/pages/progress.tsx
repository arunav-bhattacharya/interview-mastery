import React from 'react';
import Layout from '@theme/Layout';
import ProgressTracker from '@site/src/components/ProgressTracker';
import styles from './page.module.css';

export default function ProgressPage() {
  return (
    <Layout title="Progress — Interview Mastery" description="Daily streak tracker — all local to your browser.">
      <main className={styles.main}>
        <div className={styles.head}>
          <span className="im-accent-rule" />
          <h1>Your progress</h1>
          <p>A tiny streak tracker, stored only in your browser. Mark a check-in for any day you put in real prep time — even thirty focused minutes counts.</p>
        </div>
        <ProgressTracker />
      </main>
    </Layout>
  );
}
