'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function FadeIn({ children, delay = 0, duration = 0.6, className = '', once = true, ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
export { FadeIn };