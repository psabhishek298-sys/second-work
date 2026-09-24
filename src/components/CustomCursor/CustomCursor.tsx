import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export type CursorMode = 'default' | 'view' | 'hover' | 'drag';

let setGlobalCursorMode: (mode: CursorMode, text?: string) => void = () => {};

export function setCursorState(mode: CursorMode, text?: string) {
  setGlobalCursorMode(mode, text);
}

export const CustomCursor: React.FC = () => {
  const [mode, setMode] = useState<CursorMode>('default');
  const [customText, setCustomText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor trailing
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    setGlobalCursorMode = (newMode: CursorMode, text?: string) => {
      setMode(newMode);
      setCustomText(text || (newMode === 'view' ? 'VIEW' : ''));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  const isViewMode = mode === 'view';
  const isHoverMode = mode === 'hover';

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Main Cursor Circle */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isViewMode ? 84 : isHoverMode ? 48 : 10,
          height: isViewMode ? 84 : isHoverMode ? 48 : 10,
          backgroundColor: isViewMode
            ? '#141412'
            : isHoverMode
            ? 'rgba(20, 20, 18, 0.15)'
            : '#141412',
          backdropFilter: isHoverMode ? 'blur(4px)' : 'none',
          border: isHoverMode ? '1px solid rgba(20, 20, 18, 0.3)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {isViewMode && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[11px] font-mono tracking-widest text-white uppercase select-none font-medium"
          >
            {customText || 'VIEW'}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
