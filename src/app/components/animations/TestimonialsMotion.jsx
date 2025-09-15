'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function TestimonialsContainer({ children, stagger = 0.14, delayChildren = 0, once = true, className = '', ...props }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className} {...props}>{children}</div>;
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

function TestimonialItem({ children, y = 16, duration = 0.55, className = '', ...props }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className} {...props}>{children}</div>;

  const variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1, y: 0,
      transition: { duration, ease: 'easeOut' },
    },
  };

  return (
    <motion.div variants={variants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

export { TestimonialsContainer, TestimonialItem };