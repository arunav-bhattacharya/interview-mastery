import React from 'react';
import Layout from '@theme/Layout';
import TimelineRoadmap from '@site/src/components/TimelineRoadmap';
import styles from './page.module.css';

export default function SchedulePage() {
  return (
    <Layout title="Schedule — Interview Mastery" description="The 8-week visual schedule.">
      <main className={styles.main}>
        <div className={styles.head}>
          <span className="im-accent-rule" />
          <h1>8-week schedule</h1>
          <p>
            One topic per chunk, but you set the pace. Weeks 1-4 build DSA muscle;
            week 5 layers DP and heaps; weeks 6-7 cover system design and the
            backend stack; week 8 closes with behavioral prep and mocks.
          </p>
        </div>
        <TimelineRoadmap />
      </main>
    </Layout>
  );
}
