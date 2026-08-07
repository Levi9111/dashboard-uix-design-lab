import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Globe,
  Menu
} from 'lucide-react';

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    groupTitle: 'Overview',
    items: [
      { title: 'Command Center', path: '/', icon: Sparkles, badge: 'Live' },
    ],
  },
  {
    groupTitle: 'Content Management',
    items: [
      { title: 'Portfolio Projects', path: '/manage-projects', icon: FolderKanban },
      { title: 'Taxonomy Categories', path: '/manage-categories', icon: Layers },
      { title: 'Client Reviews', path: '/manage-reviews', icon: MessageSquareQuote },
      { title: 'Accordion FAQs', path: '/manage-faqs', icon: HelpCircle },
      { title: 'Subscription Pricing', path: '/manage-pricing', icon: CreditCard },
    ],
  },
  {
    groupTitle: 'System & Analytics',
    items: [
      { title: 'Site Configuration', path: '/site-config', icon: Settings },
      { title: 'Telemetry & Charts', path: '/visuals', icon: BarChart3 },
    ],
  },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const renderNavContent = () => (
    <div className='flex flex-col h-full justify-between p-4 sm:p-5 space-y-6 overflow-y-auto custom-scrollbar'>
      {/* Brand Header */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-3 border-b border-white/10 pb-4'>
          <Link to='/' className='flex items-center gap-3 group'>
            <div className='relative flex items-center justify-center'>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300'></div>
              <img
                src={logo}
                alt='UIX Design Lab'
                className='w-9 h-9 relative z-10 transform group-hover:scale-105 transition duration-300'
              />
            </div>
            <div>
              <h1 className='font-bold text-base text-white tracking-wide font-outfit leading-tight group-hover:text-purple-300 transition'>
                UIX Design Lab
              </h1>
              <div className='flex items-center gap-1.5 mt-0.5'>
                <span className='px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full'>
                  CMS v1.0
                </span>
                <span className='text-[10px] text-gray-400 font-medium'>Control Center</span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className='md:hidden p-1.5 rounded-xl bg-white/5 text-gray-400 hover:text-white'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* System Status Pill */}
        <div className='px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-xs font-medium text-emerald-400'>
            <Radio className='w-3.5 h-3.5 animate-pulse' />
            <span>MongoDB Connected</span>
          </div>
          <span className='w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80'></span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className='flex-1 space-y-6'>
        {navGroups.map((group) => (
          <div key={group.groupTitle} className='space-y-2'>
            <p className='text-[10px] font-bold uppercase tracking-widest text-purple-400/80 px-3 font-outfit'>
              {group.groupTitle}
            </p>
            <div className='space-y-1'>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-l-4 border-purple-500 shadow-lg shadow-purple-950/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className='flex items-center gap-3 relative z-10'>
                      <div
                        className={`p-1.5 rounded-lg transition ${
                          isActive
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-white/5 text-gray-400 group-hover:text-purple-300 group-hover:bg-purple-500/10'
                        }`}
                      >
                        <Icon className='w-4 h-4' />
                      </div>
                      <span className='font-sans'>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span className='px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md'>
                        {item.badge}
                      </span>
                    )}

                    {isActive && !item.badge && (
                      <ChevronRight className='w-4 h-4 text-purple-400 relative z-10' />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile & External Links */}
      <div className='border-t border-white/10 pt-4 space-y-3'>
        <a
          href='http://localhost:3000'
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 text-purple-300 hover:text-white hover:border-purple-500/50 transition group text-xs font-semibold'
        >
          <div className='flex items-center gap-2'>
            <Globe className='w-4 h-4 text-purple-400 group-hover:rotate-45 transition duration-300' />
            <span>Open Public Site</span>
          </div>
          <ExternalLink className='w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition' />
        </a>

        <div className='flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10'>
          <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md font-outfit'>
            <ShieldCheck className='w-5 h-5 text-white' />
          </div>
          <div className='flex-1 overflow-hidden'>
            <p className='text-xs font-bold text-white truncate font-outfit'>System Administrator</p>
            <p className='text-[10px] text-gray-400 truncate'>admin@uixdesignlab.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Command Header */}
      <div className='md:hidden fixed top-0 left-0 right-0 z-40 bg-[#04070d]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2.5'>
          <img src={logo} alt='UIX Design Lab' className='w-7 h-7' />
          <span className='font-bold text-sm text-white font-outfit'>UIX Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className='p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white'
        >
          {mobileOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md'
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='w-72 h-full bg-[#04070d] border-r border-white/10'
              onClick={(e) => e.stopPropagation()}
            >
              {renderNavContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Permanent Glassmorphic Sidebar */}
      <aside className='hidden md:block fixed left-0 top-0 bottom-0 w-64 lg:w-72 bg-[#04070d]/90 backdrop-blur-2xl border-r border-white/10 z-40 shadow-2xl shadow-purple-950/20'>
        {renderNavContent()}
      </aside>
    </>
  );
};

export default Sidebar;
