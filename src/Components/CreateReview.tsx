import { useForm, useFieldArray } from 'react-hook-form';
import Route from './elements/Route';
import { ArrowRight } from 'lucide-react';

type ReviewFormData = {
  title: string;
  name: string;
  role: string;
  description: string;
  roi: string;
  revenue: string;
  image: string;
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
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      stats: [{ label: '', value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stats',
  });

  const onSubmit = (data: ReviewFormData) => {
    data.stats = data.stats.filter((s) => s.label && s.value); // cleanup
    console.log('Review Submitted:', data);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-2xl mx-auto mt-12 bg-white/5 border border-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6'
      >
        {/* Basic Info */}
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
            <label className='block text-white mb-1 font-medium'>
              Reviewer Image
            </label>
            <input
              type='file'
              accept='image/*'
              {...register('image', { required: 'Image is required' })}
              className='block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30'
            />
            {errors.image && (
              <p className='text-red-400 text-sm mt-1'>
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className='text-white font-medium'>Description</label>
          <textarea
            {...register('description', { required: true })}
            rows={5}
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
          className='w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:scale-[1.02] transition-transform'
        >
          Submit Review
        </button>
      </form>

      <Route link='/manage-reviews/all-reviews'>
        <ArrowRight className='w-5 h-5' />
      </Route>
    </>
  );
};

export default CreateReview;
