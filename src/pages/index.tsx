import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import TopicCard from '@site/src/components/TopicCard';
import styles from './index.module.css';

const sampleJava = `// Two-pointer: O(n) pair sum in a sorted array.
public int[] pairSum(int[] a, int target) {
  int l = 0, r = a.length - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return new int[] { l, r };
    if (s < target) l++; else r--;
  }
  return new int[] { -1, -1 };
}`;

export default function Home() {
  return (
    <Layout
      title="Interview Mastery — Senior SWE Interview Preparation"
      description="A structured interview-prep program covering DSA, system design, SQL, Java, cloud, GenAI, low-level design, and behavioral interviews."
    >
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>SENIOR · STRUCTURED · VISUAL</span>
          <h1 className={styles.title}>
            Interview prep that <span className={styles.highlight}>shows</span> you the answer.
          </h1>
          <p className={styles.subtitle}>
            A comprehensive program for senior software engineer interviews — DSA, system design,
            low-level design, Java &amp; Spring, SQL, AWS &amp; GenAI, and behavioral interviews.
            Every pattern ships with a visualizer and reference code in four languages.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryBtn} to="/learn/guide/master-guide">Open the Master Guide →</Link>
            <Link className={styles.ghostBtn} to="/learn/dsa/arrays-strings">Jump into DSA</Link>
          </div>

          <div className={styles.codePeek}>
            <CodeBlock language="java" title="example.java">
              {sampleJava}
            </CodeBlock>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="im-accent-rule" />
            <h2>What you study</h2>
            <p>Seven pillars. Each lesson is a hub with a Quick Navigation bar, multiple patterns, and runnable code in Java / Kotlin / Python / Go.</p>
          </div>

          <div className={styles.grid}>
            <TopicCard
              accent="amber"

              title="Data Structures &amp; Algorithms"
              summary="Arrays & Strings, Lists & Trees, Heap & Trie, Graphs & DP, More Patterns — plus Problem Checklist and Practice Solutions."
              href="/learn/dsa/arrays-strings"
              meta="5 hubs + 2 refs"
            />
            <TopicCard
              accent="iris"

              title="System Design"
              summary="Fundamentals, Building Blocks, Advanced Patterns, three Case Study sets, and Low-Level Design."
              href="/learn/system-design/fundamentals"
              meta="7 pages"
            />
            <TopicCard
              accent="amber"

              title="Core JVM Skills"
              summary="Java Core, Concurrency, Modern Java, Design Patterns — plus Kotlin, Spring, Quarkus, Microservices."
              href="/learn/java/core"
              meta="6 sections"
            />
            <TopicCard
              accent="mint"

              title="SQL"
              summary="JOINs, GROUP BY, subqueries, CTEs, window functions, query optimization — one comprehensive hub."
              href="/learn/sql/practice"
              meta="1 hub"
            />
            <TopicCard
              accent="cyan"

              title="Gen AI"
              summary="Hands-on 8-week AI engineering curriculum — Python, RAG, Agents, LangGraph, MCP, fine-tuning, evals, capstone."
              href="/learn/genai"
              meta="8 weeks"
            />
            <TopicCard
              accent="iris"

              title="Cloud"
              summary="AWS &amp; Cloud Architecture — VPC, IAM, compute, storage, databases, messaging, HA/DR."
              href="/learn/cloud/aws-architecture"
              meta="1 hub"
            />
            <TopicCard
              accent="rose"

              title="Behavioral"
              summary="STAR method, common questions, story bank, interview tips, day-of checklist."
              href="/learn/behavioral/prep"
              meta="1 hub"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="im-accent-rule" />
            <h2>How it's built</h2>
            <p>Three opinions that shape every page.</p>
          </div>

          <div className={styles.threeUp}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⌧</div>
              <h3>Hub pages with Quick Navigation</h3>
              <p>Each lesson is a hub: a Quick Navigation pill bar at the top, followed by collapsible sections that walk you through each pattern using a consistent template.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>{`{ }`}</div>
              <h3>Four languages, side by side</h3>
              <p>Algorithm code in Java, Kotlin, Python, and Go. Pick once and the choice syncs across every lesson.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>◷</div>
              <h3>Yours to pace</h3>
              <p>Move at the speed that fits you. The Study Plan board and Progress page live entirely in your browser — no account, no telemetry.</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Ready when you are.</h2>
            <p className={styles.ctaSubtitle}>Start with the Master Guide for the bird's-eye view, or jump into DSA if you already know the shape.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryBtn} to="/learn/guide/master-guide">Open the Master Guide</Link>
              <Link className={styles.ghostBtn} to="/study-plan">View Study Plan</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
