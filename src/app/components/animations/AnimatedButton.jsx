'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function AnimatedButton({ as = 'button', children, className = '', whileHover = {}, whileTap = {}, ...props }) {
  const reduce = useReducedMotion();
  const Base = as === 'a' ? 'a' : 'button';
  const MotionEl = motion(Base);

  const hover = reduce ? {} : { scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' }, ...whileHover };
  const tap = reduce ? {} : { scale: 0.98, transition: { duration: 0.15, ease: 'easeOut' }, ...whileTap };

  return (
    <MotionEl whileHover={hover} whileTap={tap} className={className} {...props}>
      {children}
    </MotionEl>
  );
}

export default AnimatedButton;
export { AnimatedButton };