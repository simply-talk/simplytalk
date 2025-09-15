'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function StaggerContainer({ children, stagger = 0.12, delayChildren = 0, once = true, className = '', ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, y = 12, delay = 0, duration = 0.5, className = '', ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: 'easeOut', delay },
    },
  };

  return (
    <motion.div variants={variants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

export { StaggerContainer, StaggerItem };