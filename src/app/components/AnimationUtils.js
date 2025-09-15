import { motion } from 'framer-motion';

// Custom hook to safely detect prefers-reduced-motion
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
};

// Base variants (safe for SSR — animation logic handled in components)
export const logoHeroVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const headingVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const stepsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export const stepsItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const testimonialsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

export const testimonialsItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const buttonVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 250 },
};

export const formVariants = {
  initial: { opacity: 0, y: 10 },
  finished: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

// Reusable Animated Components
export const AnimatedHeading = ({ children, className, delay = 0, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.h2
      initial="initial"
      animate="animate"
      variants={headingVariants}
      transition={{ ...headingVariants.transition, delay, duration: prefersReduced ? 0 : undefined }}
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.h2>
  );
};

export const AnimatedLogo = ({ children, className, delay = 0, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={logoHeroVariants}
      transition={{ ...logoHeroVariants.transition, delay, duration: prefersReduced ? 0 : undefined }}
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton = ({ children, className, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.a
      initial="initial"
      animate="animate"
      whileHover={!prefersReduced ? 'whileHover' : false}
      whileTap={!prefersReduced ? 'whileTap' : false}
      variants={buttonVariants}
      transition={
        prefersReduced
          ? { duration: 0 }
          : buttonVariants.transition
      }
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export const StaggerContainer = ({ children, className, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={stepsContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: prefersReduced ? 0 : 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={prefersReduced ? undefined : stepsItemVariants}
      initial={prefersReduced ? { opacity: 1, y: 0 } : 'hidden'}
      animate={prefersReduced ? { opacity: 1, y: 0 } : 'show'}
      transition={prefersReduced ? { duration: 0 } : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const TestimonialsContainer = ({ children, className, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={testimonialsContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: prefersReduced ? 0 : 0.3 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const TestimonialItem = ({ children, className, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={prefersReduced ? undefined : testimonialsItemVariants}
      initial={prefersReduced ? { opacity: 1, y: 0 } : 'hidden'}
      animate={prefersReduced ? { opacity: 1, y: 0 } : 'show'}
      transition={prefersReduced ? { duration: 0 } : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Generic fade-in
export const FadeIn = ({ children, className, delay = 0, duration = 0.6, ...props }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};