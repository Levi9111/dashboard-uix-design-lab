import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  HelpCircle, 
  MessageSquareQuote, 
  BarChart3, 
  Settings, 
  CreditCard,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useGetAllProjectsQuery } from './redux/api/projectsApi';
import { useGetAllReviewsQuery } from './redux/api/reviewsApi';
import { useGetAllFAQsQuery } from './redux/api/faqsApi';
import { useGetAllPricingPlansQuery } from './redux/api/pricingApi';
import { useGetSiteConfigQuery } from './redux/api/siteConfigApi';

const Home = () => {
  const { data: projectsData } = useGetAllProjectsQuery();
  const { data: reviewsData } = useGetAllReviewsQuery();
  const { data: faqsData } = useGetAllFAQsQuery();
  const { data: pricingData } = useGetAllPricingPlansQuery();
  const { data: configData } = useGetSiteConfigQuery();

  const totalProjects = projectsData?.data?.length || 0;
  const totalReviews = reviewsData?.data?.length || 0;
  const totalFaqs = faqsData?.data?.length || 0;
  const totalPlans = pricingData?.data?.length || 0;
  const config = configData?.data;

  const stats = [
    {
      title: 'Portfolio Projects',
      count: totalProjects,
      subtitle: 'Dynamic database items',
      icon: FolderKanban,
      color: 'from-purple-500 to-indigo-600',
      shadow: 'shadow-purple-900/30',
      link: '/manage-projects/all-projects',
    },
    {
      title: 'Client Reviews',
      count: totalReviews,
      subtitle: 'Verified testimonials',
      icon: MessageSquareQuote,
      color: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-cyan-900/30',
      link: '/manage-reviews/all-reviews',
    },
    {
      title: 'FAQ Database',
      count: totalFaqs,
      subtitle: 'Active Q&A entries',
      icon: HelpCircle,
      color: 'from-pink-500 to-rose-500',
      shadow: 'shadow-pink-900/30',
      link: '/manage-faqs/all-faqs',
    },
    {
      title: 'Pricing Packages',
      count: totalPlans,
      subtitle: 'Live tier options',
      icon: CreditCard,
      color: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-900/30',
      link: '/manage-pricing',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Projects',
      desc: 'Add, update or delete portfolio entries with Cloudinary assets.',
      icon: FolderKanban,
      link: '/manage-projects',
      accent: 'text-purple-400',
    },
    {
      title: 'Reviews & Stories',
      desc: 'Control client testimonials, ROI stats, and revenue badges.',
      icon: MessageSquareQuote,
      link: '/manage-reviews',
      accent: 'text-cyan-400',
    },
    {
      title: 'Interactive FAQs',
      desc: 'Maintain site-wide accordions with custom icon tags.',
      icon: HelpCircle,
      link: '/manage-faqs',
      accent: 'text-pink-400',
    },
    {
      title: 'Pricing Plans',
      desc: 'Configure monthly/yearly plans, features list and popular badges.',
      icon: CreditCard,
      link: '/manage-pricing',
      accent: 'text-amber-400',
    },
    {
      title: 'Project Categories',
      desc: 'Create pre-saved categories for effortless project classification.',
      icon: Layers,
      link: '/manage-categories',
      accent: 'text-indigo-400',
    },
    {
      title: 'Site Configuration',
      desc: 'Update primary Gmail, phone, location, Calendly & Telegram hooks.',
      icon: Settings,
      link: '/site-config',
      accent: 'text-emerald-400',
    },
  ];

  return (
    <main className='px-6 md:px-12 py-28 max-w-7xl mx-auto space-y-12'>
      {/* Welcome Hero Banner */}
      <section className='relative overflow-hidden glass-panel p-10 rounded-3xl border border-white/10 shadow-2xl'>
        <div className='absolute -right-20 -top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none'></div>
        <div className='absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none'></div>

        <div className='relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8'>
          <div className='space-y-4 max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider'>
              <ShieldCheck className='w-4 h-4' />
              <span>Admin Ecosystem Control Center</span>
            </div>

            <h1 className='text-4xl md:text-5xl font-black text-white tracking-tight font-outfit leading-tight'>
              Command Your Entire <br />
              <span className='bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent'>
                UIX Design Lab Platform
              </span>
            </h1>

            <p className='text-gray-300 text-base font-sans leading-relaxed'>
              Centralized CMS hub to manage dynamic content, projects, client reviews, pricing packages, Telegram webhook alerts, and booking URL redirection in real time.
            </p>
          </div>

          <div className='glass-panel p-6 rounded-2xl border border-white/15 space-y-4 shrink-0 min-w-[280px]'>
            <div className='flex items-center justify-between text-xs text-gray-400 border-b border-white/10 pb-3'>
              <span className='flex items-center gap-1.5 text-gray-300 font-semibold'>
                <Activity className='w-4 h-4 text-emerald-400' /> System Health
              </span>
              <span className='px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold'>ACTIVE</span>
            </div>

            <div className='space-y-2.5 text-xs text-gray-300'>
              <div className='flex items-center justify-between'>
                <span>Primary Email:</span>
                <span className='font-mono text-purple-300'>{config?.primaryEmail || 'Configured'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Calendly Route:</span>
                <span className='font-mono text-cyan-300'>{config?.calendlyUrl ? 'Active' : 'Pending'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Telegram Bot Hook:</span>
                <span className='font-mono text-emerald-300'>{config?.telegramBotToken ? 'Connected' : 'Default'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Metrics Grid */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={item.link}
                className='group glass-panel p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden block'
              >
                <div className='flex items-start justify-between mb-4'>
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg ${item.shadow}`}>
                    <Icon className='w-6 h-6' />
                  </div>
                  <ArrowUpRight className='w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300' />
                </div>

                <div>
                  <h3 className='text-3xl font-black text-white font-outfit tracking-tight'>{item.count}</h3>
                  <p className='text-sm font-semibold text-gray-200 mt-1 font-outfit'>{item.title}</p>
                  <p className='text-xs text-gray-400 mt-0.5 font-sans'>{item.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </section>

      {/* Management Modules Grid */}
      <section className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-white font-outfit flex items-center gap-2'>
              <Zap className='w-5 h-5 text-purple-400' />
              <span>Core Modules & Controls</span>
            </h2>
            <p className='text-sm text-gray-400'>Direct access to dynamic CMS controllers and site configuration</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.link}
                className='glass-panel p-6 rounded-3xl border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.05] transition duration-300 group flex flex-col justify-between gap-4'
              >
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${action.accent} group-hover:scale-110 transition duration-300`}>
                      <Icon className='w-6 h-6' />
                    </div>
                    <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-gray-400 group-hover:text-white border border-white/10 transition'>
                      Manage
                    </span>
                  </div>

                  <h3 className='text-xl font-bold text-white font-outfit group-hover:text-purple-300 transition'>
                    {action.title}
                  </h3>

                  <p className='text-sm text-gray-400 leading-relaxed font-sans'>
                    {action.desc}
                  </p>
                </div>

                <div className='flex items-center gap-2 text-xs font-semibold text-purple-400 pt-3 border-t border-white/10 group-hover:translate-x-1 transition duration-300'>
                  <span>Open Control Panel</span>
                  <ArrowUpRight className='w-4 h-4' />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Integration Status Footer Banner */}
      <section className='glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-purple-950/20 via-indigo-950/20 to-transparent'>
        <div className='flex items-center gap-4'>
          <div className='p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'>
            <CheckCircle2 className='w-6 h-6' />
          </div>
          <div>
            <h3 className='text-lg font-bold text-white font-outfit'>Zero-Heavy Frontend Architecture Active</h3>
            <p className='text-xs text-gray-400'>All booking validations, notifications, and dynamic arrays are served by server-uix-design-lab.</p>
          </div>
        </div>

        <Link
          to='/visuals'
          className='flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition shrink-0'
        >
          <BarChart3 className='w-4 h-4 text-cyan-400' />
          <span>View Visual Performance</span>
        </Link>
      </section>
    </main>
  );
};

export default Home;
