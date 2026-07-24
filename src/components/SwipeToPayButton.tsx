import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';

interface SwipeToPayButtonProps {
  onConfirm: () => void;
  totalAmount: number;
}

export default function SwipeToPayButton({ onConfirm, totalAmount }: SwipeToPayButtonProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [constraintsWidth, setConstraintsWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current && handleRef.current) {
      // Calculate max drag distance (padding 4px on each side = 8)
      setConstraintsWidth(containerRef.current.offsetWidth - handleRef.current.offsetWidth - 8);
    }
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    if (isConfirmed) return;

    // If dragged more than 75% of the way, confirm
    const threshold = constraintsWidth * 0.75;

    if (info.offset.x >= threshold) {
      setIsConfirmed(true);
      controls.start({ x: constraintsWidth });
      setTimeout(() => {
        onConfirm();
      }, 300); // slight delay for animation to finish visually
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-14 bg-primary rounded-full flex items-center justify-center overflow-hidden select-none mt-2 shadow-md"
    >
      {/* Background Text */}
      <span className="text-white font-bold text-[15px] tracking-wide pl-8 z-0">
        {isConfirmed ? 'Processing...' : `Slide to pay | ₹${totalAmount}`}
      </span>
      
      {/* Draggable Handle */}
      <motion.div
        ref={handleRef}
        drag={isConfirmed ? false : "x"}
        dragConstraints={{ left: 0, right: constraintsWidth }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-sm"
      >
        <ChevronsRight className="text-primary w-6 h-6" />
      </motion.div>
    </div>
  );
}
