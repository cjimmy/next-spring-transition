import React from 'react';
import { useTrail, animated } from 'react-spring';
// You can also import { a } from 'react-spring' as a shorthand for `animated`

/**
 * Abstracting out the trail animation
 * Note that we have to forward the ref from the parent
 * */
export const ListTrailAnimation = React.forwardRef((props, ref) => {
  const items = React.Children.toArray(props.children);
  const trail = useTrail(items.length, {
    ref: ref,
    config: { mass: 13, tension: 2000, friction: 200 },
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 40 },
    reverse: props.reverse,
  });

  return (
    <>
      {trail.map(({ y, ...rest }, i) => (
        <animated.div
          key={i}
          style={{
            ...rest,
            transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
          }}
        >
          {items[i]}
        </animated.div>
      ))}
    </>
  );
});
