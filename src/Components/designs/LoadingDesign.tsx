'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const LoadingDesign = () => {
  // Memoized random positions for consistent layout
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        size: Math.random() * 2 + 1,
      })),
    [],
  );

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm overflow-hidden'>
      {/* Orbiting Galaxy Core */}
      <motion.div
        className='relative w-[120px] h-[120px]'
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: [0.7, 1, 0.95, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        {/* Core Planet */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 shadow-2xl shadow-indigo-500/30' />

        {/* Orbit Ring */}
        <div className='absolute w-full h-full border border-dashed border-white/10 rounded-full animate-spin-slow' />

        {/* Orbiting Glow */}
        <motion.div
          className='absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-xl'
          animate={{
            rotate: 360,
            x: '50%',
            y: '-50%',
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 6,
          }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className='absolute bottom-12 text-sm text-white/60 font-mono tracking-wider'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 1.2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        Initializing galaxy...
      </motion.p>

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className='absolute rounded-full bg-white/10'
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5 + p.delay,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDesign;
