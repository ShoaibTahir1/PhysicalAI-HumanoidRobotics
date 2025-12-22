import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Read the Book - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="An Educational Book on How Digital Brains Control Physical Bodies">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <h3>Physical AI</h3>
                <div className="text--center">
                  <img
                    src="/img/chapters/software-to-motion.jpg"
                    alt="Physical AI"
                    className={styles.featureSvg}
                  />
                </div>
                <p>Learn how artificial intelligence controls physical systems and robots</p>
              </div>
              <div className="col col--4">
                <h3>Humanoid Robotics</h3>
                <div className="text--center">
                  <img
                    src="/img/chapters/humanoid-structure.jpg"
                    alt="Humanoid Robotics"
                    className={styles.featureSvg}
                  />
                </div>
                <p>Understand how robots with human-like structure function and move</p>
              </div>
              <div className="col col--4">
                <h3>Educational Focus</h3>
                <div className="text--center">
                  <img
                    src="/img/chapters/embodied-intelligence.jpg"
                    alt="Educational Focus"
                    className={styles.featureSvg}
                  />
                </div>
                <p>Designed for beginners with simple language and real-life examples</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}