import React from 'react';
import Layout from '@theme/Layout';
import StudyPlanBoard from '@site/src/components/StudyPlanBoard';
import styles from './page.module.css';

export default function StudyPlanPage() {
  return (
    <Layout title="Study Plan — Interview Mastery" description="A click-to-toggle Kanban board for the 17 program topics.">
      <main className={styles.main}>
        <div className={styles.head}>
          <span className="im-accent-rule" />
          <h1>Study plan summary</h1>
          <p>
            Every topic on a single board. Click a card to advance its status —
            Not started → In progress → Done. Everything is saved locally in
            your browser; no sign-in, no sync, no telemetry.
          </p>
        </div>
        <StudyPlanBoard />
      </main>
    </Layout>
  );
}
