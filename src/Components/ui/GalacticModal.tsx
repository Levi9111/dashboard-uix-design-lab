import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import {
  LinearMovingStar,
  SimpleTwinklingStar,
} from '../designs/SpaceBackground/MobileSpaceBackground';

type GalacticModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const GalacticModal: React.FC<GalacticModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-lg bg-background/20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <SimpleTwinklingStar
              key={`twinkle-star-${i}`}
              x={Math.random() * 100}
              y={Math.random() * 100}
              size={Math.random() * 1.5 + 1}
              delay={Math.random() * 3}
            />
          ))}

          {/* Starry background glow */}
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(109,40,217,0.2),transparent_80%)] z-0 pointer-events-none' />

          <motion.div
            className='relative bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-white rounded-2xl shadow-2xl border border-purple-800 p-4 max-w-2xl w-[80vw] mx-auto md:w-full z-10 overflow-hidden h-[70vh] md:h-[90vh] max-h-[600px]'
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {Array.from({ length: 10 }).map((_, i) => {
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
            {/* Close button */}
            <button
              onClick={onClose}
              className='absolute top-4 right-4 text-white/60 hover:text-white transition'
            >
              <X className='w-6 h-6' />
            </button>

            {/* Header */}
            <h2 className='text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text'>
              {title}
            </h2>

            {/* Content */}
            <div
              className='text-white/90 leading-relaxed space-y-4 relative z-10 h-full overflow-y-scroll pr-2 md:pb-16 pb-20 2xl:pl-0'
              style={{
                scrollbarWidth: 'thin',
              }}
            >
              {children}
            </div>

            <style>{`
              /* Firefox */
              * {
                scrollbar-width: thin;
                scrollbar-color: #7c3aed #1e1e2e;
              }

              /* WebKit (Chrome, Edge, Safari) */
              ::-webkit-scrollbar {
                width: 8px;
              }

              ::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
              }

              ::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, #8b5cf6, #6366f1);
                border-radius: 10px;
                box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
                transition: background 0.3s ease;
              }

              ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, #a78bfa, #818cf8);
                box-shadow: 0 0 10px rgba(167, 139, 250, 0.8);
              }
            `}</style>

            {/* Bottom glow ring */}
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent blur-sm opacity-50' />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalacticModal;
