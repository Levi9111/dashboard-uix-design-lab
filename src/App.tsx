import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';

const App = () => {
  return (
    <div className='relative min-h-screen bg-[#04070d] text-white overflow-x-hidden flex'>
      {/* Glassmorphic Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Administrative Workspace */}
      <main className='flex-1 min-h-screen md:pl-64 lg:pl-72 flex flex-col justify-between pt-16 md:pt-6 px-4 sm:px-8 pb-8 z-10 transition-all duration-300'>
        <div className='max-w-[1400px] w-full mx-auto space-y-6'>
          <Outlet />
        </div>
        <div className='mt-12'>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;
