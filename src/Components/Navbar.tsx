import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/logos/logo.svg';
import { 
  FolderKanban, 
  HelpCircle, 
  MessageSquareQuote, 
  BarChart3, 
  Settings, 
  CreditCard,
  Radio,
  Sparkles,
  Layers,
  Menu,
  X
} from 'lucide-react';

const navLinks = [
  { title: 'Overview', path: '/', icon: Sparkles },
  { title: 'Projects', path: '/manage-projects', icon: FolderKanban },
  { title: 'FAQs', path: '/manage-faqs', icon: HelpCircle },
  { title: 'Reviews', path: '/manage-reviews', icon: MessageSquareQuote },
  { title: 'Pricing', path: '/manage-pricing', icon: CreditCard },
  { title: 'Taxonomy', path: '/manage-categories', icon: Layers },
  { title: 'Site Config', path: '/site-config', icon: Settings },
  { title: 'Analytics', path: '/visuals', icon: BarChart3 },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-[#04070d]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-950/20'
          : 'py-3.5 bg-[#04070d]/70 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4'>
        {/* Brand Logo & Title */}
        <Link to='/' className='flex items-center gap-2.5 group shrink-0'>
          <div className='relative flex items-center justify-center'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-md opacity-50 group-hover:opacity-90 transition duration-300'></div>
            <img
              src={logo}
              alt='UIX Design Lab'
              className='w-8 h-8 relative z-10 transform group-hover:scale-105 transition duration-300'
            />
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-bold text-base text-white tracking-wide font-outfit whitespace-nowrap'>
              UIX Design Lab
            </span>
            <span className='px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full whitespace-nowrap hidden sm:inline-block'>
              CMS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className='hidden xl:flex items-center gap-0.5 bg-white/[0.04] p-1 rounded-2xl border border-white/10 backdrop-blur-lg shadow-inner'>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.title}
                to={link.path}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId='activeTab'
                    className='absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 rounded-xl shadow-md shadow-purple-900/40 border border-white/20'
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 shrink-0 ${isActive ? 'text-white' : 'text-purple-400/70'}`} />
                <span className='relative z-10 whitespace-nowrap'>{link.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Status Pill & Mobile Menu Toggle */}
        <div className='flex items-center gap-2.5 shrink-0'>
          <div className='hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium whitespace-nowrap'>
            <Radio className='w-3 h-3 animate-pulse text-emerald-400' />
            <span>API Online</span>
          </div>

          <Link
            to='/site-config'
            className='p-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-purple-500/10 text-gray-300 hover:text-white transition group'
            title='Site Configuration'
          >
            <Settings className='w-4 h-4 group-hover:rotate-90 transition duration-300' />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition'
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='xl:hidden bg-[#04070d]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-2 mt-2'
          >
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.title}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      isActive
                        ? 'bg-purple-600/90 text-white border border-purple-500/40 shadow-lg'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <Icon className='w-3.5 h-3.5 text-purple-400 shrink-0' />
                    <span className='truncate'>{link.title}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
