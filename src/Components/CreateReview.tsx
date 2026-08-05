import { useForm } from 'react-hook-form';
import { useCreateReviewMutation } from '../redux/api/reviewsApi';
import ToastMessage from './ui/ToastMessage';
import ImageUploader from './ui/ImageUploader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquareQuote, User, Building, Briefcase, TrendingUp, Award, FileText } from 'lucide-react';

type ReviewFormData = {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  roi: string;
  revenue: string;
  avatarUrl: string;
};

const CreateReview = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      avatarUrl: '',
    },
  });

  const currentAvatar = watch('avatarUrl');
  const navigate = useNavigate();
  const [createReview, { isLoading }] = useCreateReviewMutation();

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
    try {
      const payload = {
        name: data.name,
        role: data.role,
        company: data.company,
        testimonial: data.testimonial,
        roi: data.roi,
        revenue: data.revenue,
        avatarUrl: data.avatarUrl,
      };

      const result = await createReview(payload).unwrap();
      if (result.success) {
        setToast({
          show: true,
          message: 'Review created successfully',
          type: 'success',
        });
        reset();
        setTimeout(() => {
          navigate('/manage-reviews/all-reviews');
        }, 1200);
      } else {
        setToast({
          show: true,
          message: 'Failed to create review',
          type: 'error',
        });
      }
    } catch {
      setToast({
        show: true,
        message: 'Failed to create review',
        type: 'error',
      });
    } finally {
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    }
  };

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='glass-panel p-8 rounded-3xl border border-white/10 space-y-6'
      >
        <div className='flex items-center gap-3 border-b border-white/10 pb-5'>
          <div className='p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'>
            <MessageSquareQuote className='w-6 h-6' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white font-outfit'>Add Client Testimonial</h2>
            <p className='text-xs text-gray-400'>Upload client avatar and submit verified revenue & ROI case studies</p>
          </div>
        </div>

        {/* Client Avatar File Uploader */}
        <ImageUploader
          label='Client Profile Avatar'
          value={currentAvatar}
          onChange={(url) => setValue('avatarUrl', url)}
        />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Name */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Client Name
            </label>
            <div className='relative'>
              <User className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('name', { required: 'Name is required' })}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:bg-white/10 transition text-sm'
                placeholder='e.g. Sarah Connor'
              />
            </div>
            {errors.name && (
              <p className='text-red-400 text-xs mt-1'>{errors.name.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Role & Title
            </label>
            <div className='relative'>
              <Briefcase className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('role', { required: 'Role is required' })}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:bg-white/10 transition text-sm'
                placeholder='e.g. Head of Product'
              />
            </div>
            {errors.role && (
              <p className='text-red-400 text-xs mt-1'>{errors.role.message}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Company Name
            </label>
            <div className='relative'>
              <Building className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('company')}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:bg-white/10 transition text-sm'
                placeholder='e.g. Cyberdyne Inc'
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* ROI Tag */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              ROI Impact Tag
            </label>
            <div className='relative'>
              <TrendingUp className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('roi')}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:bg-white/10 transition text-sm'
                placeholder='e.g. +340% Conversions'
              />
            </div>
          </div>

          {/* Revenue Tag */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Revenue Impact Tag
            </label>
            <div className='relative'>
              <Award className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('revenue')}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:bg-white/10 transition text-sm'
                placeholder='e.g. $1.2M ARR Generated'
              />
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
            Client Testimonial Quote
          </label>
          <div className='relative'>
            <FileText className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
            <textarea
              rows={4}
              {...register('testimonial', {
                required: 'Testimonial quote is required',
              })}
              className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:bg-white/10 transition text-sm resize-none'
              placeholder='Write the verified feedback or case study summary...'
            />
          </div>
          {errors.testimonial && (
            <p className='text-red-400 text-xs mt-1'>
              {errors.testimonial.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className='pt-4 border-t border-white/10 flex justify-end gap-4'>
          <button
            type='button'
            onClick={() => reset()}
            className='px-5 py-3 rounded-xl border border-white/15 text-gray-400 hover:text-white transition text-sm font-semibold'
          >
            Reset Form
          </button>
          <button
            disabled={isLoading}
            type='submit'
            className='px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-600/30 transition transform hover:-translate-y-0.5'
          >
            {isLoading ? 'Saving Review...' : 'Publish Testimonial'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReview;
