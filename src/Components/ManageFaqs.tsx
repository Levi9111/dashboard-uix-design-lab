import { Outlet, Link, useLocation } from 'react-router-dom';
import { HelpCircle, Plus, ListFilter } from 'lucide-react';

const ManageFaqs = () => {
  const location = useLocation();
  const isAllFaqs = location.pathname.includes('/all-faqs');

  return (
    <div className='py-28 max-w-7xl mx-auto px-6 space-y-8'>
      {/* Header */}
      <div className='glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <div className='flex items-center gap-2 text-pink-400 text-sm font-semibold mb-2'>
            <HelpCircle className='w-4 h-4' />
            <span>KNOWLEDGE BASE & FAQS</span>
          </div>
          <h1 className='text-3xl font-extrabold text-white font-outfit'>Manage FAQ Section</h1>
          <p className='text-gray-400 text-sm mt-1'>
            Configure interactive Q&A accordions and recommended Lucide icons displayed on the platform.
          </p>
        </div>

        {/* Tab switcher */}
        <div className='flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0'>
          <Link
            to='/manage-faqs'
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              !isAllFaqs
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus className='w-4 h-4' />
            <span>Add FAQ</span>
          </Link>
          <Link
            to='/manage-faqs/all-faqs'
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              isAllFaqs
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ListFilter className='w-4 h-4' />
            <span>All FAQs</span>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default ManageFaqs;
