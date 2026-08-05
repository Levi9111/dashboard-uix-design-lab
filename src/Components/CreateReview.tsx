import { useForm, useFieldArray } from 'react-hook-form';
import Route from './elements/Route';
import { ArrowRight } from 'lucide-react';
import { useCreateReviewMutation } from '../redux/api/reviewsApi';
import ToastMessage from './ui/ToastMessage';
import { useState } from 'react';

type ReviewFormData = {
  company: string;
  name: string;
  role: string;
  testimonial: string;
  roi: string;
  revenue: string;
  avatarUrl: string;
  stats: {
    label: string;
    value: string;
  }[];
};

const CreateReview = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<ReviewFormData>({
    defaultValues: {
      stats: [{ label: '', value: '' }],
    },
  });

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stats',
  });

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const onSubmit = async (data: ReviewFormData) => {
    const { company, name, role, testimonial, roi, revenue, avatarUrl, stats } = data;
    try {
      const formattedStats: Record<string, string> = {};

      stats
        .filter((s) => s.label && s.value)
        .forEach((stat) => {
          formattedStats[stat.label] = stat.value;
        });

      const payload = {
        company,
        name,
        role,
        testimonial,
        roi,
        revenue,
        avatarUrl,
        stats: formattedStats,
      };

      const result = await createReview(payload).unwrap();

      if (result.success) {
        setToast({
          show: true,
          message: 'Review created successfully',
          type: 'success',
        });
        reset();
      } else {
        setToast({
          show: true,
          message: 'Failed to create review',
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: 'Failed to create review',
        type: 'error',
      });
    } finally {
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  return (
    <>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-2xl mx-auto mt-12 bg-white/5 border border-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6'
      >
        {/* Basic Info */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            <label className='text-white font-medium'>Company Name</label>
            <input
              {...register('company', { required: true })}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. StyleHub'
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
            <label className='text-white font-medium'>Role</label>
            <input
              {...register('role', { required: true })}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='e.g. CEO'
            />
          </div>

          <div>
            <label className='block text-white mb-1 font-medium'>
              Avatar URL (Cloudinary / Hosted)
            </label>
            <input
              type='text'
              {...register('avatarUrl')}
              className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
              placeholder='https://res.cloudinary.com/...'
            />
          </div>
        </div>

        {/* Testimonial */}
        <div>
          <label className='text-white font-medium'>Testimonial</label>
          <textarea
            {...register('testimonial', { required: true })}
            rows={4}
            className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none resize-none'
            placeholder='Write the full testimonial here...'
          />
        </div>

        {/* ROI & Revenue */}
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

        {/* Dynamic Stats */}
        <div className='space-y-4 mt-6'>
          <div className='flex justify-between items-center'>
            <label className='text-white font-medium text-lg'>Stats</label>
            <button
              type='button'
              onClick={() => {
                if (fields.length < 3) append({ label: '', value: '' });
              }}
              disabled={fields.length >= 3}
              className='text-sm px-3 py-1 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold  hover:scale-[1.02] transition-transform disabled:opacity-50'
            >
              + Add Stat
            </button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'
            >
              <div>
                <label className='text-white font-medium'>Label</label>
                <input
                  {...register(`stats.${index}.label`)}
                  className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
                  placeholder='e.g. Conversions'
                />
              </div>
              <div>
                <label className='text-white font-medium'>Value</label>
                <input
                  {...register(`stats.${index}.value`)}
                  className='w-full mt-1 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-400 outline-none'
                  placeholder='e.g. 42%'
                />
              </div>
              <button
                type='button'
                onClick={() => remove(index)}
                className='text-red-400 hover:underline text-sm sm:mt-6'
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={isLoading}
          className={`w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg transition-transform hover:scale-[1.02] ${
            isLoading ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      <Route link='/manage-reviews/all-reviews'>
        <ArrowRight className='w-5 h-5' />
      </Route>
    </>
  );
};

export default CreateReview;
