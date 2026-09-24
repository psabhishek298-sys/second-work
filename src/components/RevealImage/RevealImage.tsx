import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  clipReveal?: boolean;
  parallax?: boolean;
  priority?: boolean;
  onClick?: () => void;
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  clipReveal = true,
  priority = false,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-5% 0px' });

  // Fallback architectural placeholder if network is unavailable
  const fallbackSrc = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative overflow-hidden bg-[#ECECE6] rounded-md ${aspectRatio} ${className}`}
    >
      {/* Skeleton loader / Blur backdrop */}
      <div
        className={`absolute inset-0 bg-[#E5E5DF] transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Animated Image Container */}
      <motion.div
        className="w-full h-full"
        initial={clipReveal ? { clipPath: 'inset(100% 0% 0% 0%)' } : { opacity: 0 }}
        animate={
          isInView || priority
            ? clipReveal
              ? { clipPath: 'inset(0% 0% 0% 0%)' }
              : { opacity: 1 }
            : clipReveal
            ? { clipPath: 'inset(100% 0% 0% 0%)' }
            : { opacity: 0 }
        }
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
      >
        <img
          src={hasError ? fallbackSrc : src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
            isLoaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-sm opacity-0'
          }`}
        />
      </motion.div>
    </div>
  );
};
