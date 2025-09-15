'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function PageTransition({ children, className = '', duration = 0.45, y = 8, ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -y }}
      transition={{ duration, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
export { PageTransition };