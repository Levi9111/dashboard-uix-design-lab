import { useForm } from 'react-hook-form';
import { useUpdateReviewMutation } from '../redux/api/reviewsApi';
import GalacticModal from './ui/GalacticModal';
import ImageUploader from './ui/ImageUploader';
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
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: review.name,
      role: review.role,
      company: review.company || '',
      testimonial: review.testimonial || review.description || '',
      roi: review.roi || '',
      avatarUrl: review.avatarUrl || '',
    },
  });

  const currentAvatar = watch('avatarUrl');

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
          avatarUrl: data.avatarUrl,
        },
      }).unwrap();

      if (result?.success) {
        onSuccess();
        setToast({
          show: true,
          message: 'Review updated successfully',
          type: 'success',
        });
      } else {
        setToast({
          show: true,
          message: 'Update failed',
          type: 'error',
        });
      }
    } catch {
      setToast({
        show: true,
        message: 'Update failed',
        type: 'error',
      });
    }
  };

  return (
    <GalacticModal isOpen={true} onClose={onClose} title='Update Review Details'>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <ImageUploader
          label='Client Profile Avatar'
          value={currentAvatar}
          onChange={(url) => setValue('avatarUrl', url)}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
              Client Name
            </label>
            <input
              {...register('name', { required: true })}
              className='w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white rounded-xl outline-none focus:border-cyan-500 text-sm'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
              Company Name
            </label>
            <input
              {...register('company')}
              className='w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white rounded-xl outline-none focus:border-cyan-500 text-sm'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
              Role & Title
            </label>
            <input
              {...register('role', { required: true })}
              className='w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white rounded-xl outline-none focus:border-cyan-500 text-sm'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
              ROI Impact Tag
            </label>
            <input
              {...register('roi')}
              placeholder='e.g. 42%'
              className='w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white rounded-xl outline-none focus:border-cyan-500 text-sm'
            />
          </div>
        </div>

        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
            Testimonial Content
          </label>
          <textarea
            rows={4}
            {...register('testimonial', { required: true })}
            className='w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white rounded-xl outline-none focus:border-cyan-500 text-sm resize-none'
          />
        </div>

        <div className='flex justify-end gap-3 pt-4 border-t border-white/10'>
          <button
            type='button'
            onClick={onClose}
            className='px-5 py-2.5 rounded-xl border border-white/15 text-gray-400 hover:text-white transition text-xs font-semibold'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:shadow-lg transition text-xs'
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </GalacticModal>
  );
};

export default UpdateReviewModal;
