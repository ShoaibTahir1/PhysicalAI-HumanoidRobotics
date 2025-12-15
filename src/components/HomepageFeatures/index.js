import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Physical AI',
    description: (
      <>
        Learn how artificial intelligence controls physical systems and robots,
        bridging the gap between digital intelligence and the physical world.
      </>
    ),
  },
  {
    title: 'Humanoid Robotics',
    description: (
      <>
        Understand how robots with human-like structure function, move, and
        interact with their environment.
      </>
    ),
  },
  {
    title: 'Educational Focus',
    description: (
      <>
        Designed for beginners with simple language, real-life examples,
        and a friendly teaching tone.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}