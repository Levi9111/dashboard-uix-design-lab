'use client';

import { MessageCircle, X, Zap, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMedia } from '../hooks/useMedia';
import { Telegram, WhatsApp } from 'developer-icons';

const ForDesktop = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<
    'whatsapp' | 'telegram' | null
  >(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded) {
        setPulseKey((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/1234567890?text=Hello! I need support.',
      '_blank',
    );
  };

  const handleTelegram = () => {
    window.open('https://t.me/yourusername', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-6 right-6 z-50 animate-float'>
      {/* Widget Container */}
      <div
        className={`relative bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 
        backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-700 ease-out
        overflow-hidden ${isExpanded ? 'h-[280px] w-[280px]' : 'h-16 w-16'}`}
        style={{
          boxShadow: isExpanded
            ? '0 20px 40px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            : '0 8px 20px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Animated background glow */}
        <div className='absolute inset-0 overflow-hidden rounded-2xl'>
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 
            rounded-2xl blur-xl transition-all duration-1000 ${
              isExpanded ? 'scale-110 opacity-80' : 'scale-90 opacity-60'
            }`}
            key={pulseKey}
          />
          <div className='absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl' />
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleExpanded}
          className='absolute top-0 left-0 w-16 h-16 z-20 flex items-center justify-center text-white 
          hover:text-cyan-300 transition-all duration-300 group'
        >
          <div className='relative flex items-center justify-center '>
            {/* Rotating border */}
            <div
              className={`absolute -left-1 -top-1 inset-0 w-8 h-8 border-2 border-transparent border-t-cyan-400 border-r-purple-400 
              rounded-full transition-all duration-700 ${
                isExpanded ? 'animate-spin' : 'animate-pulse'
              }`}
            />

            {/* Icon */}
            <div className='relative z-10 group-hover:scale-110 transition-transform duration-300'>
              <div
                className={`transition-all duration-300 ${
                  isExpanded ? 'rotate-90' : 'rotate-0'
                }`}
              >
                {isExpanded ? (
                  <X className='w-6 h-6 drop-shadow-lg' />
                ) : (
                  <MessageCircle className='w-6 h-6 drop-shadow-lg' />
                )}
              </div>
            </div>

            {/* Notification dot */}
            {!isExpanded && (
              <div
                className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 
                rounded-full animate-pulse border border-white/30'
                key={pulseKey}
              />
            )}
          </div>
        </button>

        {/* Expanded Content */}
        <div
          className={`relative z-10 pt-7 px-4 pb-4 transition-all duration-500 ease-out ${
            isExpanded
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Header */}
          <div className='text-center mb-4'>
            <h3 className=' font-bold text-lg mb-1 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
              Need Help?
            </h3>
            <p className='text-white/70 text-sm'>
              Choose your preferred platform
            </p>
          </div>

          {/* Support Options */}
          <div className='space-y-3'>
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              onMouseEnter={() => setHoveredButton('whatsapp')}
              onMouseLeave={() => setHoveredButton(null)}
              className='group w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-green-600/20 
              border border-green-500/30 rounded-xl hover:scale-105 hover:border-green-400/50 
              transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 relative overflow-hidden'
            >
              <div
                className={`absolute inset-0 bg-green-500/10 transition-all duration-300 ${
                  hoveredButton === 'whatsapp' ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className='relative z-10 p-1 bg-green-500/20 rounded-lg'>
                <WhatsApp className='w-7 h-7 text-green-300' />
              </div>

              <div className='flex-1 text-left relative z-10'>
                <span className='text-white text-sm font-medium'>
                  WhatsApp Chat
                </span>
                <p className='text-white/60 text-xs'>Quick response</p>
              </div>

              <div className='relative z-10 flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                <Users className='w-4 h-4 text-green-300/60' />
              </div>
            </button>

            {/* Telegram Button */}
            <button
              onClick={handleTelegram}
              onMouseEnter={() => setHoveredButton('telegram')}
              onMouseLeave={() => setHoveredButton(null)}
              className='group w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 
              border border-blue-500/30 rounded-xl hover:scale-105 hover:border-blue-400/50 
              transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden'
            >
              <div
                className={`absolute inset-0 bg-blue-500/10 transition-all duration-300 ${
                  hoveredButton === 'telegram' ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className='relative z-10 p-1 bg-blue-500/20 rounded-lg'>
                <Telegram className='w-7 h-7 text-blue-300' />
              </div>

              <div className='flex-1 text-left relative z-10'>
                <span className='text-white text-sm font-medium'>
                  Telegram Support
                </span>
                <p className='text-white/60 text-xs'>Secure messaging</p>
              </div>

              <div className='relative z-10 flex items-center gap-2'>
                <div
                  className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'
                  style={{ animationDelay: '0.5s' }}
                />
                <Zap className='w-4 h-4 text-blue-300/60' />
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className='mt-4 text-center'>
            <p className='text-white/50 text-xs'>Average response: 60 min</p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-8px) rotate(1deg); 
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const ForMobile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [activeButton, setActiveButton] = useState<
    'whatsapp' | 'telegram' | null
  >(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded) {
        setPulseKey((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleWhatsApp = () => {
    setActiveButton('whatsapp');
    setTimeout(() => {
      window.open(
        'https://wa.me/1234567890?text=Hello! I need support.',
        '_blank',
      );
      setActiveButton(null);
    }, 200);
  };

  const handleTelegram = () => {
    setActiveButton('telegram');
    setTimeout(() => {
      window.open('https://t.me/yourusername', '_blank');
      setActiveButton(null);
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-4 right-4 z-50 animate-mobile-float'>
      {/* Widget Container */}
      <div
        className={`relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 
        backdrop-blur-xl border border-white/25 rounded-2xl shadow-2xl transition-all duration-600 ease-out
        overflow-hidden ${isExpanded ? 'h-[140px] w-[200px]' : 'h-14 w-14'}`}
        style={{
          boxShadow: isExpanded
            ? '0 15px 35px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 6px 15px -3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Animated background glow */}
        <div className='absolute inset-0 overflow-hidden rounded-2xl'>
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 
            rounded-2xl blur-lg transition-all duration-800 ${
              isExpanded ? 'scale-110 opacity-90' : 'scale-95 opacity-70'
            }`}
            key={pulseKey}
          />
          <div className='absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-2xl' />
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleExpanded}
          className='absolute top-0 left-0 w-14 h-14 z-20 flex items-center justify-center text-white 
          hover:text-cyan-300 transition-all duration-300 group active:scale-95'
        >
          <div className='relative flex items-center justify-center'>
            {/* Rotating border */}
            <div
              className={`absolute -left-1 -top-1 inset-0 w-7 h-7 border-2 border-transparent border-t-cyan-400 border-r-purple-400 
              rounded-full transition-all duration-600 ${
                isExpanded ? 'animate-spin' : 'animate-pulse'
              }`}
            />

            {/* Icon */}
            <div className='relative z-10 group-hover:scale-110 group-active:scale-95 transition-transform duration-300'>
              <div
                className={`transition-all duration-400 ${
                  isExpanded ? 'rotate-90' : 'rotate-0'
                }`}
              >
                {isExpanded ? (
                  <X className='w-5 h-5 drop-shadow-lg' />
                ) : (
                  <MessageCircle className='w-5 h-5 drop-shadow-lg' />
                )}
              </div>
            </div>

            {/* Notification dot */}
            {!isExpanded && (
              <div
                className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 
                rounded-full animate-pulse border border-white/40'
                key={pulseKey}
              />
            )}
          </div>
        </button>

        {/* Expanded Content - Mobile Icons Only */}
        <div
          className={`relative z-10 pt-16 px-3 pb-3 transition-all duration-500 ease-out ${
            isExpanded
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {/* Support Options - Icon Grid */}
          <div className='flex justify-center gap-4'>
            {/* WhatsApp Icon Button */}
            <button
              onClick={handleWhatsApp}
              className={`group relative w-12 h-12 bg-gradient-to-br from-green-500/30 to-green-600/30 
              border border-green-500/40 rounded-xl hover:scale-110 active:scale-95 hover:border-green-400/60 
              transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 overflow-hidden
              ${activeButton === 'whatsapp' ? 'scale-95 bg-green-500/50' : ''}`}
            >
              {/* Hover overlay */}
              <div className='absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              {/* Ripple effect */}
              <div className='absolute inset-0 bg-green-400/30 rounded-xl scale-0 group-active:scale-100 group-active:opacity-0 opacity-50 transition-all duration-200' />

              <div className='relative z-10 flex items-center justify-center h-full'>
                <WhatsApp className='w-7 h-7 text-green-300 group-hover:text-green-200 transition-colors duration-300' />
              </div>

              {/* Active indicator */}
              <div className='absolute bottom-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse' />
            </button>

            {/* Telegram Icon Button */}
            <button
              onClick={handleTelegram}
              className={`group relative w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 
              border border-blue-500/40 rounded-xl hover:scale-110 active:scale-95 hover:border-blue-400/60 
              transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 overflow-hidden
              ${activeButton === 'telegram' ? 'scale-95 bg-blue-500/50' : ''}`}
            >
              {/* Hover overlay */}
              <div className='absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              {/* Ripple effect */}
              <div className='absolute inset-0 bg-blue-400/30 rounded-xl scale-0 group-active:scale-100 group-active:opacity-0 opacity-50 transition-all duration-200' />

              <div className='relative z-10 flex items-center justify-center h-full'>
                <Telegram className='w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors duration-300' />
              </div>

              {/* Active indicator */}
              <div
                className='absolute bottom-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse'
                style={{ animationDelay: '0.5s' }}
              />
            </button>
          </div>

          {/* Bottom indicator dots */}
          <div className='flex justify-center gap-1 mt-3'>
            <div className='w-1 h-1 bg-white/40 rounded-full' />
            <div className='w-1 h-1 bg-white/20 rounded-full' />
            <div className='w-1 h-1 bg-white/40 rounded-full' />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes mobile-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-6px) rotate(0.5deg); 
          }
        }
        .animate-mobile-float {
          animation: mobile-float 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const AnimatedSupportWidget = () => {
  const device = useMedia();

  return device === 'mobile' ? <ForMobile /> : <ForDesktop />;
};

export default AnimatedSupportWidget;
