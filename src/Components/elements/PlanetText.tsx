'use client';

import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { ReactNode, useRef } from 'react';
import {
  User,
  Sparkles,
  Globe,
  Orbit,
  Stars,
  ArrowUpRight,
} from 'lucide-react';
import { useMedia } from '../hooks/useMedia';

type PlanetTextProps = {
  title: string | ReactNode;
  subtitle: string | ReactNode;
  btnText?: string | ReactNode;
};

const desktopSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.6, ease: 'easeOut' },
  },
};

// Mobile animations - simplified and performant
const mobileTitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const mobileSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const mobileBtnVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const MobilePlanetText: React.FC<PlanetTextProps> = ({
  title,
  subtitle,
  btnText,
}) => {
  return (
    <div className='relative z-10 mx-auto w-full max-w-sm px-4 py-8 text-center'>
      {/* Simplified static background */}
      <div className='absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2'>
        <div className='w-48 h-48 rounded-full border border-white/5' />
        <div className='absolute inset-4 rounded-full border border-white/3' />
      </div>

      {btnText && (
        <div className='w-full flex items-center justify-center'>
          <motion.button
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.8 }}
            variants={mobileBtnVariants}
            className='px-4 py-2 rounded-full border border-gray-300 flex items-center justify-center gap-1 mb-3 bg-white/5 backdrop-blur-sm'
          >
            <User size={14} className='text-gray-400' />
            <p className='text-xs text-gray-400 font-normal uppercase tracking-wide'>
              {btnText}
            </p>
          </motion.button>
        </div>
      )}

      <motion.h3
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.8 }}
        variants={mobileTitleVariants}
        className='text-2xl font-bold text-white mb-3 leading-tight'
      >
        {title}
      </motion.h3>

      <motion.p
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.8 }}
        variants={mobileSubtitleVariants}
        className='text-base text-gray-300 leading-relaxed'
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

// Enhanced Desktop animations - more complex and engaging
const desktopTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.8,
      delay: 0.2,
    },
  },
};

const enhancedSubtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: 'blur(4px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  },
};

const floatingIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.8,
    },
  },
};

const orbitVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.6,
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Enhanced Desktop Component
const DesktopPlanetText: React.FC<PlanetTextProps> = ({
  title,
  subtitle,
  btnText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.9],
  );

  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      style={{ y: springY, opacity, scale }}
      className='relative z-10 mx-auto w-full max-w-4xl px-4 py-16 text-center overflow-hidden'
    >
      {/* Enhanced animated background with multiple layers */}
      <div className='absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2'>
        {/* Main orbital rings */}
        <motion.svg
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          width={400}
          height={400}
          viewBox='0 0 400 400'
          fill='none'
        >
          {/* Outer ring with gradient */}
          <motion.circle
            cx={200}
            cy={200}
            r={150}
            stroke='url(#gradient1)'
            strokeWidth={1}
            fill='none'
            initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
            animate={{
              rotate: 360,
              scale: 1,
              opacity: 1,
            }}
            transition={{
              rotate: { duration: 100, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.5, ease: 'easeOut', delay: 0.3 },
              opacity: { duration: 1.5, ease: 'easeOut', delay: 0.3 },
            }}
          />

          {/* Middle ring */}
          <motion.circle
            cx={200}
            cy={200}
            r={120}
            stroke='rgba(255,255,255,0.1)'
            strokeWidth={1}
            strokeDasharray='5,10'
            fill='none'
            initial={{ rotate: 0, scale: 0.3, opacity: 0 }}
            animate={{
              rotate: -360,
              scale: 1,
              opacity: 1,
            }}
            transition={{
              rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.2, ease: 'easeOut', delay: 0.5 },
              opacity: { duration: 1.2, ease: 'easeOut', delay: 0.5 },
            }}
          />

          {/* Inner pulsing core */}
          <motion.circle
            cx={200}
            cy={200}
            r={80}
            stroke='rgba(255,255,255,0.05)'
            strokeWidth={2}
            fill='rgba(255,255,255,0.02)'
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.7,
            }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop
                offset='0%'
                style={{ stopColor: 'rgba(255,255,255,0.2)', stopOpacity: 1 }}
              />
              <stop
                offset='50%'
                style={{ stopColor: 'rgba(255,255,255,0.05)', stopOpacity: 1 }}
              />
              <stop
                offset='100%'
                style={{ stopColor: 'rgba(255,255,255,0.1)', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Floating accent elements */}
        <motion.div
          variants={floatingIconVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.6 }}
          className='absolute -top-8 -right-12'
        >
          <motion.div
            animate={{
              rotate: 360,
              y: [0, -20, 0],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Stars size={24} className='text-white/20' />
          </motion.div>
        </motion.div>

        <motion.div
          variants={floatingIconVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.6 }}
          className='absolute -bottom-6 -left-16'
        >
          <motion.div
            animate={{
              rotate: -360,
              x: [0, 15, 0],
              y: [0, -10, 0],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
              x: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Sparkles size={20} className='text-white/15' />
          </motion.div>
        </motion.div>

        <motion.div
          variants={floatingIconVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.6 }}
          className='absolute top-12 -left-20'
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <Orbit size={18} className='text-white/25' />
          </motion.div>
        </motion.div>
      </div>

      {btnText && (
        <div className='w-full flex items-center justify-center mb-8'>
          <motion.button
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.6 }}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.9 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 150,
                  damping: 12,
                  delay: 0.1,
                },
              },
            }}
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: '0 10px 25px rgba(255,255,255,0.1)',
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            className='group relative px-6 py-3 rounded-full border border-white/20 flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden'
          >
            {/* Button background glow effect */}
            <motion.div
              className='absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100'
              initial={false}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              // animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className='animate-spin duration-150'
            >
              <Globe
                size={16}
                className='text-white/70 group-hover:text-white transition-colors relative z-10'
              />
            </motion.div>
            <p className='text-sm text-white/70 group-hover:text-white font-medium uppercase tracking-wider transition-colors relative z-10'>
              {btnText}
            </p>
            <motion.div
              className='opacity-0 group-hover:opacity-100 transition-opacity relative z-10'
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowUpRight size={14} className='text-white/70' />
            </motion.div>
          </motion.button>
        </div>
      )}

      <motion.h3
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.6 }}
        variants={desktopTitleVariants}
        className='relative text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight'
      >
        <motion.span
          className='inline-block'
          whileHover={{
            scale: 1.02,
            textShadow: '0 0 20px rgba(255,255,255,0.3)',
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.span>

        {/* Title accent glow */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0'
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
      </motion.h3>

      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.6 }}
        variants={enhancedSubtitleVariants}
        className='relative max-w-3xl mx-auto'
      >
        <motion.p
          className='text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light'
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {subtitle}
        </motion.p>

        {/* Subtitle underline accent */}
        <motion.div
          className='absolute bottom-0 left-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent'
          initial={{ width: '0%', x: '-50%' }}
          whileInView={{ width: '60%' }}
          transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Additional decorative elements */}
      <motion.div
        className='absolute top-1/2 left-8 w-1 h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent'
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />

      <motion.div
        className='absolute top-1/2 right-8 w-1 h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent'
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />
    </motion.div>
  );
};

// Main responsive component
export const PlanetText: React.FC<PlanetTextProps> = (props) => {
  const device = useMedia();
  return (
    <>
      {device === 'mobile' ? (
        <MobilePlanetText {...props} />
      ) : (
        <DesktopPlanetText {...props} />
      )}
    </>
  );
};
