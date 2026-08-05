import { Outlet, Link, useLocation } from 'react-router-dom';
import { FolderKanban, Plus, ListFilter } from 'lucide-react';

const ManageProjects = () => {
  const location = useLocation();
  const isAllProjects = location.pathname.includes('/all-projects');

  return (
    <div className='py-28 max-w-7xl mx-auto px-6 space-y-8'>
      {/* Header */}
      <div className='glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <div className='flex items-center gap-2 text-purple-400 text-sm font-semibold mb-2'>
            <FolderKanban className='w-4 h-4' />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h1 className='text-3xl font-extrabold text-white font-outfit'>Manage Website Projects</h1>
          <p className='text-gray-400 text-sm mt-1'>
            Add, update, or remove portfolio showcase items rendered on the main UIX Design Lab platform.
          </p>
        </div>

        {/* Tab switcher */}
        <div className='flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0'>
          <Link
            to='/manage-projects'
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              !isAllProjects
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus className='w-4 h-4' />
            <span>Add Project</span>
          </Link>
          <Link
            to='/manage-projects/all-projects'
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              isAllProjects
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ListFilter className='w-4 h-4' />
            <span>All Projects</span>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default ManageProjects;
