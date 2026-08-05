'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const randomColor = () =>
  ['#ffffff', '#a855f7', '#38bdf8', '#facc15', '#f472b6'][
    Math.floor(Math.random() * 5)
  ];
const getStarColor = () =>
  ['#ffffff', '#93c5fd', '#f472b6', '#facc15', '#a855f7', '#5eead4'][
    Math.floor(Math.random() * 6)
  ];

const FloatingDot = ({
  startX,
  startY,
  size,
  duration,
  delay = 0,
}: {
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay?: number;
}) => (
  <motion.div
    className='absolute rounded-full blur-sm opacity-60'
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${randomColor()} 0%, transparent 70%)`,
      top: `${startY}%`,
      left: `${startX}%`,
    }}
    animate={{
      x: [`0%`, `${Math.random() * 20 - 10}%`, '0%'],
      y: [`0%`, `${Math.random() * 20 - 10}%`, '0%'],
      opacity: [0.3, 0.9, 0.3],
      scale: [1, 1.2, 1],
      rotate: [0, 15, -15, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

const TwinklingStar = ({
  x,
  y,
  size = 2,
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
        opacity: 0.8,
        boxShadow: `0 0 6px ${color}`,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const DriftingPlanet = ({
  startX,
  startY,
  size,
  color,
  duration,
}: {
  startX: string;
  startY: string;
  size: string;
  color: string;
  duration: number;
}) => (
  <motion.div
    className='absolute rounded-full'
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle at 30% 30%, ${color}, #04070d)`,
      boxShadow: `0 0 20px ${color}`,
      top: startY,
      left: startX,
    }}
    animate={{
      x: ['0%', '5%', '-5%', '0%'],
      y: ['0%', '-5%', '5%', '0%'],
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const OrbitRing = ({ size, speed = 60 }: { size: number; speed?: number }) => (
  <motion.div
    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
  >
    <div className='w-full h-full rounded-full border border-white/10' />
  </motion.div>
);

const Comet = ({
  startX,
  startY,
  delay,
  size = 2,
}: {
  startX: number;
  startY: number;
  delay: number;
  size?: number;
}) => (
  <motion.div
    className='absolute'
    style={{
      width: `${size}px`,
      height: `${size}px`,
      background: 'white',
      borderRadius: '50%',
      top: `${startY}%`,
      left: `${startX}%`,
      boxShadow: '0 0 12px white, 0 0 24px white',
      filter: 'blur(0.5px)',
    }}
    initial={{ opacity: 0 }}
    animate={{
      x: ['0%', '100%'],
      y: ['0%', '50%', '100%'],
      rotate: [0, 30],
      opacity: [0, 1, 0],
    }}
    transition={{
      delay,
      duration: 2.5,
      repeat: Infinity,
      repeatDelay: 4,
      ease: 'easeOut',
    }}
  />
);

const ShootingStar = () => {
  const [visible, setVisible] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStartPos({ x: Math.random() * 100, y: Math.random() * 50 });
      setVisible(true);
      setTimeout(() => setVisible(false), 1500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return visible ? (
    <motion.div
      className='absolute bg-white rounded-full'
      style={{
        width: '2px',
        height: '2px',
        top: `${startPos.y}%`,
        left: `${startPos.x}%`,
        boxShadow: '0 0 12px white',
      }}
      initial={{ opacity: 0 }}
      animate={{
        x: ['0%', '30%'],
        y: ['0%', '30%'],
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    />
  ) : null;
};

const LinearMovingStar = ({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  duration = 4,
  size = 2,
}: {
  startX: number; // in vw
  startY: number; // in vh
  endX: number; // in vw
  endY: number; // in vh
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

const TabAndDesktopSpaceBackground = () => {
  return (
    <div className='fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-transparent'>
      {/* Floating dots */}
      {Array.from({ length: 10 }).map((_, i) => (
        <FloatingDot
          key={`dot-${i}`}
          startX={Math.random() * 100}
          startY={Math.random() * 100}
          size={Math.random() * 8 + 4}
          duration={Math.random() * 20 + 10}
          delay={Math.random() * 4}
        />
      ))}
      {/* Linear moving stars in random directions */}
      {Array.from({ length: 20 }).map((_, i) => {
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

      {/* Twinkling stars */}
      {Array.from({ length: 280 }).map((_, i) => (
        <TwinklingStar
          key={`star-${i}`}
          x={Math.random() * 100}
          y={Math.random() * 100}
          size={Math.random() + 1}
          delay={Math.random() * 3}
        />
      ))}

      {/* Drifting planets */}
      <DriftingPlanet
        startX='10%'
        startY='80%'
        size='80px'
        color='#38bdf8'
        duration={40}
      />
      <DriftingPlanet
        startX='80%'
        startY='10%'
        size='70px'
        color='#facc15'
        duration={60}
      />
      <DriftingPlanet
        startX='25%'
        startY='20%'
        size='50px'
        color='#a855f7'
        duration={50}
      />

      {/* Orbit rings */}
      <OrbitRing size={500} />
      <OrbitRing size={700} speed={90} />

      {/* Comets */}
      <Comet startX={-10} startY={0} delay={1} />
      <Comet startX={-20} startY={10} delay={4} />
      <Comet startX={-30} startY={20} delay={7} />
      <Comet startX={-25} startY={60} delay={3.5} />
      <Comet startX={-15} startY={40} delay={5.5} />

      {/* Shooting star */}
      <ShootingStar />
    </div>
  );
};

export default TabAndDesktopSpaceBackground;
