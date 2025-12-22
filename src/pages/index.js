import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <Translate id="theme.navbar.title" description="The title in the navbar">
            {siteConfig.title}
          </Translate>
        </h1>
        <p className="hero__subtitle">
          <Translate id="theme.navbar.subtitle" description="The tagline/subtitle in the navbar">
            {siteConfig.tagline}
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id="homepage.readBookButton" description="Button text to read the book">
              Read the Book - 5min ⏱️
            </Translate>
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
      title={translate({
        id: 'homepage.title',
        description: 'The title of the homepage',
        message: `Hello from ${siteConfig.title}`
      })}
      description={translate({
        id: 'homepage.description',
        description: 'Description of the educational book',
        message: 'An Educational Book on How Digital Brains Control Physical Bodies'
      })}>
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <h3>
                  <Translate id="homepage.physicalAI.title" description="Title for Physical AI section">
                    Physical AI
                  </Translate>
                </h3>
                <div className="text--center">
                  <img
                    src="/img/chapters/software-to-motion.jpg"
                    alt={translate({
                      id: 'homepage.physicalAI.imageAlt',
                      description: 'Alt text for Physical AI image',
                      message: 'Physical AI'
                    })}
                    className={styles.featureSvg}
                  />
                </div>
                <p>
                  <Translate id="homepage.physicalAI.description" description="Description for Physical AI section">
                    Learn how artificial intelligence controls physical systems and robots
                  </Translate>
                </p>
              </div>
              <div className="col col--4">
                <h3>
                  <Translate id="homepage.humanoidRobotics.title" description="Title for Humanoid Robotics section">
                    Humanoid Robotics
                  </Translate>
                </h3>
                <div className="text--center">
                  <img
                    src="/img/chapters/humanoid-structure.jpg"
                    alt={translate({
                      id: 'homepage.humanoidRobotics.imageAlt',
                      description: 'Alt text for Humanoid Robotics image',
                      message: 'Humanoid Robotics'
                    })}
                    className={styles.featureSvg}
                  />
                </div>
                <p>
                  <Translate id="homepage.humanoidRobotics.description" description="Description for Humanoid Robotics section">
                    Understand how robots with human-like structure function and move
                  </Translate>
                </p>
              </div>
              <div className="col col--4">
                <h3>
                  <Translate id="homepage.educationalFocus.title" description="Title for Educational Focus section">
                    Educational Focus
                  </Translate>
                </h3>
                <div className="text--center">
                  <img
                    src="/img/chapters/embodied-intelligence.jpg"
                    alt={translate({
                      id: 'homepage.educationalFocus.imageAlt',
                      description: 'Alt text for Educational Focus image',
                      message: 'Educational Focus'
                    })}
                    className={styles.featureSvg}
                  />
                </div>
                <p>
                  <Translate id="homepage.educationalFocus.description" description="Description for Educational Focus section">
                    Designed for beginners with simple language and real-life examples
                  </Translate>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}