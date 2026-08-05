import { Outlet, Link, useLocation } from 'react-router-dom';
import { MessageSquareQuote, Plus, ListFilter } from 'lucide-react';

const ManageReviews = () => {
  const location = useLocation();
  const isAllReviews = location.pathname.includes('/all-reviews');

  return (
    <div className='py-28 max-w-7xl mx-auto px-6 space-y-8'>
      {/* Header */}
      <div className='glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <div className='flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2'>
            <MessageSquareQuote className='w-4 h-4' />
            <span>CLIENT STORIES & TESTIMONIALS</span>
          </div>
          <h1 className='text-3xl font-extrabold text-white font-outfit'>Manage Reviews & Stories</h1>
          <p className='text-gray-400 text-sm mt-1'>
            Control client feedback, revenue impact metrics, ROI tags, and reviewer profile avatars.
          </p>
        </div>

        {/* Tab switcher */}
        <div className='flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0'>
          <Link
            to='/manage-reviews'
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              !isAllReviews
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus className='w-4 h-4' />
            <span>Add Review</span>
          </Link>
          <Link
            to='/manage-reviews/all-reviews'
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              isAllReviews
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ListFilter className='w-4 h-4' />
            <span>All Reviews</span>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default ManageReviews;
