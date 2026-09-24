import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  stagger?: boolean;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  as = 'div',
  stagger = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const Tag = as as any;

  if (stagger && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Tag ref={ref} className={`overflow-hidden ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration,
                delay: delay + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
