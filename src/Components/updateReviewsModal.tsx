import { useForm } from 'react-hook-form';
import { useUpdateReviewMutation } from '../redux/api/reviewsApi';
import GalacticModal from './ui/GalacticModal';
import { useState } from 'react';
import ToastMessage from './ui/ToastMessage';
import type { Review } from './ReviewsList';

interface Props {
  review: Review;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateReviewModal = ({ review, onClose, onSuccess }: Props) => {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const [updateReview, { isLoading }] = useUpdateReviewMutation();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: review.name,
      role: review.role,
      company: review.company || '',
      testimonial: review.testimonial || review.description || '',
      roi: review.roi,
      stats: {
        Conversations: review.stats?.Conversations || '',
      },
    },
  });

  const onSubmit = async (data: Partial<Review>) => {
    try {
      const result = await updateReview({
        id: review._id,
        body: {
          name: data.name,
          role: data.role,
          company: data.company,
          testimonial: data.testimonial || data.description,
          roi: data.roi,
          stats: data.stats,
        },
      }).unwrap();

      if (result?.success) {
        onSuccess();
        setToast({
          show: true,
          message: 'Review updated successfully',
          type: 'success',
        });
        reset();
      } else {
        setToast({
          show: true,
          message: 'Update failed',
          type: 'error',
        });
      }
    } catch (err) {
      console.error('Update failed:', err);
      setToast({
        show: true,
        message: 'Update failed',
        type: 'error',
      });
    }
  };

  return (
    <GalacticModal isOpen={true} onClose={onClose} title='Update Review'>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 mt-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block mb-1 text-white font-medium'>Company</label>
            <input
              {...register('company', { required: true })}
              className='w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400'
            />
          </div>

          <div>
            <label className='block mb-1 text-white font-medium'>Name</label>
            <input
              {...register('name', { required: true })}
              className='w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400'
            />
          </div>

          <div>
            <label className='block mb-1 text-white font-medium'>Role</label>
            <input
              {...register('role', { required: true })}
              className='w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400'
            />
          </div>
        </div>

        <div>
          <label className='block mb-1 text-white font-medium'>
            Testimonial
          </label>
          <textarea
            {...register('testimonial', { required: true })}
            rows={4}
            className='w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 resize-none'
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block mb-1 text-white font-medium'>ROI</label>
            <input
              {...register('roi')}
              className='w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400'
            />
          </div>

          <div>
            <label className='block mb-1 text-white font-medium'>
              Conversions
            </label>
            <input
              {...register('stats.Conversations')}
              className='w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4 mt-6'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 border rounded-lg text-sm text-white/70 hover:text-white hover:border-purple-400 transition'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:scale-[1.02] transition'
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </GalacticModal>
  );
};

export default UpdateReviewModal;
