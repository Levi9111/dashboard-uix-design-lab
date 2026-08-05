import { useForm } from 'react-hook-form';
import { useCreateProjectMutation } from '../redux/api/projectsApi';
import { useGetAllCategoriesQuery } from '../redux/api/categoriesApi';
import ToastMessage from './ui/ToastMessage';
import { useState } from 'react';
import { Sparkles, Image, Link as LinkIcon, FolderKanban, Tag, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ProjectFormData = {
  title: string;
  description: string;
  image: string;
  categoryId: string;
  redirectUrl: string;
};

const CreateProject = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const navigate = useNavigate();
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const result = await createProject(data).unwrap();
      if (result.success) {
        setToast({
          show: true,
          message: 'Project created successfully',
          type: 'success',
        });
        reset();
        setTimeout(() => {
          navigate('/manage-projects/all-projects');
        }, 1200);
      } else {
        setToast({
          show: true,
          message: 'Project creation failed',
          type: 'error',
        });
      }
    } catch {
      setToast({
        show: true,
        message: 'Project creation failed',
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
          <div className='p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400'>
            <FolderKanban className='w-6 h-6' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white font-outfit'>Add Portfolio Project</h2>
            <p className='text-xs text-gray-400'>Fill in project metadata to render on the showcase page</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Project Title */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Project Title
            </label>
            <div className='relative'>
              <Sparkles className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('title', { required: 'Title is required' })}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:bg-white/10 transition text-sm'
                placeholder='e.g. Galactic Design Portal'
              />
            </div>
            {errors.title && (
              <p className='text-red-400 text-xs mt-1'>{errors.title.message}</p>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Category
            </label>
            <div className='relative'>
              <Tag className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <select
                {...register('categoryId', { required: 'Category is required' })}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-gray-900 border border-white/15 text-white outline-none focus:border-purple-500 transition text-sm'
              >
                <option value=''>Select Category</option>
                {categoriesData?.data?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoryId && (
              <p className='text-red-400 text-xs mt-1'>{errors.categoryId.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
            Project Description
          </label>
          <div className='relative'>
            <FileText className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
            <textarea
              rows={4}
              {...register('description', {
                required: 'Description is required',
              })}
              className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:bg-white/10 transition text-sm resize-none'
              placeholder='Briefly describe the project background and key features...'
            />
          </div>
          {errors.description && (
            <p className='text-red-400 text-xs mt-1'>
              {errors.description.message}
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Image URL */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Image URL (Cloudinary / Hosted)
            </label>
            <div className='relative'>
              <Image className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('image', { required: 'Image URL is required' })}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:bg-white/10 transition text-sm'
                placeholder='https://res.cloudinary.com/...'
              />
            </div>
            {errors.image && (
              <p className='text-red-400 text-xs mt-1'>{errors.image.message}</p>
            )}
          </div>

          {/* Redirect URL */}
          <div>
            <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2'>
              Redirection URL
            </label>
            <div className='relative'>
              <LinkIcon className='w-4 h-4 text-gray-400 absolute left-4 top-3.5' />
              <input
                type='text'
                {...register('redirectUrl', { required: 'Redirect URL is required' })}
                className='w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:bg-white/10 transition text-sm'
                placeholder='https://example.com'
              />
            </div>
            {errors.redirectUrl && (
              <p className='text-red-400 text-xs mt-1'>{errors.redirectUrl.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
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
            className='px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-600/30 transition transform hover:-translate-y-0.5'
          >
            {isLoading ? 'Creating Project...' : 'Publish Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
