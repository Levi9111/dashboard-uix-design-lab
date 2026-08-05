'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Shared utilities
const getStarColor = () =>
  ['#ffffff', '#93c5fd', '#f472b6', '#facc15', '#a855f7', '#5eead4'][
    Math.floor(Math.random() * 6)
  ];

export const LinearMovingStar = ({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  duration = 4,
  size = 2,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  duration?: number;
  size?: number;
}) => (
  <motion.div
    className='absolute bg-white rounded-full'
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top: `${startY}vh`,
      left: `${startX}vw`,
      boxShadow: '0 0 8px white',
      opacity: 0.7,
    }}
    initial={{ opacity: 0 }}
    animate={{
      x: `${endX - startX}vw`,
      y: `${endY - startY}vh`,
      opacity: [0, 1, 0],
    }}
    transition={{
      delay,
      duration,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'linear',
    }}
  />
);

// Simplified twinkling star with colors and better visibility
export const SimpleTwinklingStar = ({
  x,
  y,
  size = 1,
  delay = 0,
}: {
  x: number;
  y: number;
  size?: number;
  delay?: number;
}) => {
  const [color] = useState(getStarColor());

  return (
    <motion.div
      className='absolute rounded-full'
      style={{
        width: size,
        height: size,
        top: `${y}%`,
        left: `${x}%`,
        backgroundColor: color,
        opacity: 0.6,
        boxShadow: `0 0 4px ${color}`,
      }}
      animate={{
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const MobileSpaceBackground = () => {
  const StaticStar = ({
    x,
    y,
    size = 1,
  }: {
    x: number;
    y: number;
    size?: number;
  }) => (
    <div
      className='absolute rounded-full bg-white'
      style={{
        width: size,
        height: size,
        top: `${y}%`,
        left: `${x}%`,
        opacity: 0.6,
      }}
    />
  );

  return (
    <div className='fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-transparent'>
      {/* Static stars for base layer */}
      {Array.from({ length: 18 }).map((_, i) => (
        <StaticStar
          key={`static-star-${i}`}
          x={Math.random() * 100}
          y={Math.random() * 100}
          size={Math.random() * 1 + 0.5}
        />
      ))}

      {/* Increased colored twinkling stars */}
      {Array.from({ length: 80 }).map((_, i) => (
        <SimpleTwinklingStar
          key={`twinkle-star-${i}`}
          x={Math.random() * 100}
          y={Math.random() * 100}
          size={Math.random() * 1.5 + 1}
          delay={Math.random() * 3}
        />
      ))}

      {/* Linear moving stars in random directions */}
      {Array.from({ length: 30 }).map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;

        return (
          <LinearMovingStar
            key={`random-star-${i}`}
            startX={startX}
            startY={startY}
            endX={endX}
            endY={endY}
            delay={Math.random() * 4}
            duration={Math.random() * 5 + 3}
            size={Math.random() * 2 + 1}
          />
        );
      })}
    </div>
  );
};

export default MobileSpaceBackground;
