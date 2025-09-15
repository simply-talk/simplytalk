'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function FadeInUp({ children, y = 30, delay = 0, duration = 0.8, className = '', once = true, ...props }) {
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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.1 }} // Trigger earlier
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FadeInUp;
export { FadeInUp };