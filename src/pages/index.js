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
            to="/docs/module-1/intro-to-physical-ai">
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
            <h2 className={clsx('text--center', styles.featuresTitle)}>
              <Translate id="homepage.modules.title" description="Title for modules section">
                Complete Learning Path
              </Translate>
            </h2>
            <div className="row">
              <div className="col col--4">
                <Link
                  to="/docs/module-1/intro-to-physical-ai"
                  className={styles.featureCardLink}
                >
                  <div className={styles.featureCard}>
                    <h3>
                      <Translate id="homepage.module1.title" description="Title for Module 1 section">
                        Module 1: The Robotic Nervous System (ROS 2)
                      </Translate>
                    </h3>
                    <div className="text--center">
                      <img
                        src="/img/chapters/robot-sensors.jpg"
                        alt={translate({
                          id: 'homepage.module1.imageAlt',
                          description: 'Alt text for ROS 2 image',
                          message: 'ROS 2 Architecture'
                        })}
                        className={clsx(styles.featureSvg, styles.featureImage)}
                      />
                    </div>
                    <p>
                      <Translate id="homepage.module1.description" description="Description for Module 1 section">
                        Building the communication infrastructure for robotics
                      </Translate>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col col--4">
                <Link
                  to="/docs/module-2/gazebo-physics"
                  className={styles.featureCardLink}
                >
                  <div className={styles.featureCard}>
                    <h3>
                      <Translate id="homepage.module2.title" description="Title for Module 2 section">
                        Module 2: The Digital Twin (Gazebo & Unity)
                      </Translate>
                    </h3>
                    <div className="text--center">
                      <img
                        src="/img/chapters/sim-vs-real.jpg"
                        alt={translate({
                          id: 'homepage.module2.imageAlt',
                          description: 'Alt text for Gazebo image',
                          message: 'Gazebo Physics Simulation'
                        })}
                        className={clsx(styles.featureSvg, styles.featureImage)}
                      />
                    </div>
                    <p>
                      <Translate id="homepage.module2.description" description="Description for Module 2 section">
                        Simulating physics before moving to hardware
                      </Translate>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col col--4">
                <Link
                  to="/docs/module-3/isaac-sim-overview"
                  className={styles.featureCardLink}
                >
                  <div className={styles.featureCard}>
                    <h3>
                      <Translate id="homepage.module3.title" description="Title for Module 3 section">
                        Module 3: The AI-Robot Brain (NVIDIA Isaac)
                      </Translate>
                    </h3>
                    <div className="text--center">
                      <img
                        src="/img/chapters/embodied-intelligence.jpg"
                        alt={translate({
                          id: 'homepage.module3.imageAlt',
                          description: 'Alt text for Isaac Sim image',
                          message: 'NVIDIA Isaac Sim'
                        })}
                        className={clsx(styles.featureSvg, styles.featureImage)}
                      />
                    </div>
                    <p>
                      <Translate id="homepage.module3.description" description="Description for Module 3 section">
                        High-fidelity AI acceleration for robotics
                      </Translate>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col col--4">
                <Link
                  to="/docs/module-4/llms-in-robotics"
                  className={styles.featureCardLink}
                >
                  <div className={styles.featureCard}>
                    <h3>
                      <Translate id="homepage.module4.title" description="Title for Module 4 section">
                        Module 4: Vision-Language-Action (VLA)
                      </Translate>
                    </h3>
                    <div className="text--center">
                      <img
                        src="/img/chapters/robot-sensors.jpg"
                        alt={translate({
                          id: 'homepage.module4.imageAlt',
                          description: 'Alt text for VLA image',
                          message: 'Vision-Language-Action Architecture'
                        })}
                        className={clsx(styles.featureSvg, styles.featureImage)}
                      />
                    </div>
                    <p>
                      <Translate id="homepage.module4.description" description="Description for Module 4 section">
                        Teaching robots to understand and act on natural language
                      </Translate>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col col--4">
                <Link
                  to="/docs/module-5/rtx-workstations"
                  className={styles.featureCardLink}
                >
                  <div className={styles.featureCard}>
                    <h3>
                      <Translate id="homepage.module5.title" description="Title for Module 5 section">
                        Module 5: Hardware & Lab Architecture
                      </Translate>
                    </h3>
                    <div className="text--center">
                      <img
                        src="/img/chapters/humanoid-structure.jpg"
                        alt={translate({
                          id: 'homepage.module5.imageAlt',
                          description: 'Alt text for Hardware image',
                          message: 'Hardware Setup'
                        })}
                        className={clsx(styles.featureSvg, styles.featureImage)}
                      />
                    </div>
                    <p>
                      <Translate id="homepage.module5.description" description="Description for Module 5 section">
                        The physical workstations and edge computers (Jetson) needed
                      </Translate>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col col--4">
                <Link
                  to="/docs/module-6/capstone-architecture"
                  className={styles.featureCardLink}
                >
                  <div className={styles.featureCard}>
                    <h3>
                      <Translate id="homepage.module6.title" description="Title for Module 6 section">
                        Module 6: Capstone – Autonomous Humanoid
                      </Translate>
                    </h3>
                    <div className="text--center">
                      <img
                        src="/img/chapters/future-humanoid.jpg"
                        alt={translate({
                          id: 'homepage.module6.imageAlt',
                          description: 'Alt text for Humanoid image',
                          message: 'Autonomous Humanoid Robot'
                        })}
                        className={clsx(styles.featureSvg, styles.featureImage)}
                      />
                    </div>
                    <p>
                      <Translate id="homepage.module6.description" description="Description for Module 6 section">
                        Bringing it all together into an integrated system
                      </Translate>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}