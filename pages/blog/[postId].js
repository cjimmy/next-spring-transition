import React, { useState, useRef } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Footer from '../../components/Footer';
import { useSpring, useChain, animated, config } from 'react-spring';
import { useRouter } from 'next/router';
import { ListTrailAnimation } from '../../components/animations';

export default function Home() {
  const router = useRouter();
  const [isEntry, setIsEntry] = useState(true);
  const [newRoute, setNewRoute] = useState(null);

  // References to the animations so we can useChain to sequence them
  const titleAnimRef = useRef();
  const subtitleAnimRef = useRef();
  const bodyAnimRef = useRef();

  // Simple and sweet spring animation for the title
  // `reverse` allows us to run the animation in reverse with a state change
  const titleProps = useSpring({
    config: config.stiff,
    ref: titleAnimRef,
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 40 },
    reset: false,
    reverse: !isEntry,
    onRest: newRoute ? () => router.push(newRoute) : () => {},
    // if onRest is too slow for you, try switching it to onStart
  });

  // horizontal animation for the subtitle title
  const subtitleProps = useSpring({
    config: config.slow,
    ref: subtitleAnimRef,
    to: { opacity: 1, width: '100%' },
    from: { opacity: 0, width: '0%' },
    reset: false,
    reverse: !isEntry,
  });

  // Sequence together the animations and set their timing
  useChain(
    isEntry
      ? [titleAnimRef, subtitleAnimRef, bodyAnimRef]
      : [bodyAnimRef, subtitleAnimRef, titleAnimRef],
    isEntry ? [0.0, 0.3, 0.8] : [0.0, 0.3, 0.5]
  );

  const pushRoute = (url) => {
    // reverse the animation sequence
    setIsEntry(false);
    // set the route so it knows where to go when the animation is done
    setNewRoute(url);
  };

  // stub for dynamic slug (not important)
  const dynamicSlug = 'my-post';

  return (
    <div className={styles.container}>
      {/* Document head stuff */}
      <Head>
        <title>Next + react-spring transitions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main body */}
      <main className={styles.main}>
        {/* Animated title */}
        <animated.h1
          className={styles.title}
          style={{
            ...titleProps,
            transform: titleProps.y.interpolate(
              (y) => `translate3d(0,${y}px,0)`
            ),
          }}
        >
          Dynamic page: Blog Post
        </animated.h1>

        <div style={{ overflow: 'hidden' }}>
          <animated.p className={styles.description} style={subtitleProps}>
            This example shows smoothly animated page transitions with route
            changes in Next.js
          </animated.p>
        </div>
        <button onClick={() => setIsEntry(!isEntry)}>
          View in-page animation
        </button>

        {/* Animated cards */}
        <div className={styles.grid}>
          <ListTrailAnimation ref={bodyAnimRef} reverse={!isEntry}>
            {/* Card 1 */}
            <div onClick={() => pushRoute('/')}>
              <a className={styles.card}>
                <h3>Home &rarr;</h3>
                <p>Home page, aka /index.js</p>
              </a>
            </div>

            {/* Card 2 */}
            <div onClick={() => pushRoute('/about')}>
              <a className={styles.card}>
                <h3>/about &rarr;</h3>
                <p>Just another route, at the same level</p>
              </a>
            </div>

            {/* Card 3 */}
            <div className={styles.card}>
              <h3>/blog/[postId].js &rarr;</h3>
              <p>A dynamic route, for example</p>
            </div>
          </ListTrailAnimation>
        </div>
      </main>

      {/* Stock footer */}
      <Footer />
    </div>
  );
}
