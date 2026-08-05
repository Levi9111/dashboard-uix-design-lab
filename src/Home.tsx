import { PlanetText } from './Components/elements/PlanetText';

const Home = () => {
  return (
    <main className='px-6 md:px-20 py-28 space-y-16'>
      {/* Hero Section */}
      <section className='uix-center text-center space-y-4'>
        <PlanetText
          title='Admin Dashboard'
          subtitle='Manage all aspects of the UIX Design Lab — from projects and reviews
          to team oversight and analytics — all in one place.'
        />
      </section>

      {/* Admin Features */}
      <section className='grid md:grid-cols-3 gap-8 text-center'>
        <div className='bg-white/10 p-6 rounded-xl border border-white/10 hover:border-purple-400 transition'>
          <h2 className='text-xl font-semibold text-white'>Project Control</h2>
          <p className='text-gray-300 mt-2'>
            Create, edit, and monitor design projects across the organization.
          </p>
        </div>

        <div className='bg-white/10 p-6 rounded-xl border border-white/10 hover:border-purple-400 transition'>
          <h2 className='text-xl font-semibold text-white'>
            Review Management
          </h2>
          <p className='text-gray-300 mt-2'>
            Approve, reject, or edit client feedback and testimonial
            submissions.
          </p>
        </div>

        <div className='bg-white/10 p-6 rounded-xl border border-white/10 hover:border-purple-400 transition'>
          <h2 className='text-xl font-semibold text-white'>Team Analytics</h2>
          <p className='text-gray-300 mt-2'>
            View team performance metrics, submission rates, and usage insights.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className='text-center space-y-4'>
        <h3 className='text-2xl text-white font-bold'>
          Ready to start managing?
        </h3>
        <p className='text-gray-400'>
          Navigate to any section using the sidebar or quick access below.
        </p>
        <div className='flex justify-center gap-4 flex-wrap'>
          <button className='px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:scale-[1.03] transition'>
            Manage Projects
          </button>
          <button className='px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:scale-[1.03] transition'>
            Manage Reviews
          </button>
          <button className='px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:scale-[1.03] transition'>
            View Analytics
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
