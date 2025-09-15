'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const tagMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
  span: motion.span,
};

function AnimatedHeading({ as = 'h2', children, y = 8, delay = 0, duration = 0.6, className = '', once = true, ...props }) {
  const reduce = useReducedMotion();
  const MotionTag = tagMap[as] || motion.div;

  if (reduce) {
    const StaticTag = as || 'div';
    return <StaticTag className={className} {...props}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export default AnimatedHeading;
export { AnimatedHeading };