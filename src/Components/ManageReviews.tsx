import { useForm } from 'react-hook-form';
import { PlanetText } from './elements/PlanetText';

type ReviewFormData = {
  title: string;
  name: string;
  role: string;
  description: string;
  roi: string;
  revenue: string;
  image: string;
  stats: {
    conversions: string;
    bounce_rate: string;
    satisfaction: string;
  };
};

const ManageReviews = () => {
  const { register, handleSubmit, reset } = useForm<ReviewFormData>();

  const onSubmit = (data: ReviewFormData) => {
    console.log('Review Submitted:', data);
    reset();
  };

  return (
    <div className='py-24 px-4'>
      <PlanetText
        title='Manage Client Testimonials'
        subtitle='Submit powerful case studies from your clients to showcase your impact.'
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-2xl mx-auto mt-12 bg-white/5 border border-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            <label className='text-white font-medium'>Title</label>
            <input
              {...register('title', { required: true })}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. Lana’s E-commerce Leap'
            />
          </div>

          <div>
            <label className='text-white font-medium'>Name</label>
            <input
              {...register('name', { required: true })}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. Lana Rodriguez'
            />
          </div>

          <div>
            <label className='text-white font-medium'>Role & Company</label>
            <input
              {...register('role', { required: true })}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. CEO, StyleHub'
            />
          </div>

          <div>
            <label className='text-white font-medium'>
              Initials or Image Placeholder
            </label>
            <input
              {...register('image', { required: true })}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. LR'
            />
          </div>
        </div>

        <div>
          <label className='text-white font-medium'>Description</label>
          <textarea
            {...register('description', { required: true })}
            rows={5}
            className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none resize-none'
            placeholder='Write the full testimonial here...'
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            <label className='text-white font-medium'>ROI</label>
            <input
              {...register('roi')}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. 42%'
            />
          </div>
          <div>
            <label className='text-white font-medium'>Revenue Impact</label>
            <input
              {...register('revenue')}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. 30%'
            />
          </div>
        </div>

        {/* Fixed Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
          <div>
            <label className='text-white font-medium'>Conversions</label>
            <input
              {...register('stats.conversions')}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. 33%'
            />
          </div>
          <div>
            <label className='text-white font-medium'>Bounce Rate</label>
            <input
              {...register('stats.bounce_rate')}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. -18%'
            />
          </div>
          <div>
            <label className='text-white font-medium'>Satisfaction</label>
            <input
              {...register('stats.satisfaction')}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. 94%'
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:scale-[1.02] transition-transform'
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ManageReviews;
