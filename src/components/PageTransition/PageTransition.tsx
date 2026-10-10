import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Overlay curtain that wipes out on page enter
const CurtainOverlay: React.FC = () => {
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      curtainRef.current,
      { yPercent: 0 },
      { yPercent: -101, duration: 0.85, ease: 'expo.inOut', delay: 0.05 }
    );
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[200] bg-[#141412] pointer-events-none"
      aria-hidden="true"
    />
  );
};

const pageVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <CurtainOverlay key={location.pathname + '_curtain'} />
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
};
