import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { useTransition, a, config } from 'react-spring';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const { asPath, components, route } = router;
    setItems([
      {
        id: asPath,
        Component: components[route].Component || Component,
        pageProps: components[route].props.pageProps || pageProps,
      },
    ]);
  }, [router]);

  // Global zoom effect on each page transition
  const transitions = useTransition(items, (item) => item.id, {
    config: config.slow,
    from: { transform: `scale(1.1)` },
    enter: { transform: `scale(1)` },
    leave: { transform: `scale(1)` },
  });

  return (
    <div style={{ position: 'relative' }}>
      {transitions.map(({ item, props, key }) => {
        const { Component, pageProps } = item;
        return (
          <a.div className="positioner" key={key} style={props}>
            <Component {...pageProps} />
          </a.div>
        );
      })}
    </div>
  );
}

export default MyApp;
