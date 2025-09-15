'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function LogoFloatPulse({ children, className = '', ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [0, -3, 0], scale: [1, 1.01, 1] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default LogoFloatPulse;
export { LogoFloatPulse };