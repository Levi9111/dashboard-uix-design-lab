import { useForm } from 'react-hook-form';
import Route from './elements/Route';
import { ArrowRight } from 'lucide-react';
import { useCreateProjectMutation } from '../redux/api/projectsApi';
import { useGetAllCategoriesQuery } from '../redux/api/categoriesApi';
import ToastMessage from './ui/ToastMessage';
import { useState } from 'react';

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
      } else {
        setToast({
          show: true,
          message: 'Project creation failed',
          type: 'error',
        });
      }
    } catch (err) {
      console.error('Mutation failed:', err);
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
    <>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-xl mx-auto mt-12 bg-white/5 border border-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 glassmorphic'
      >
        {/* Title */}
        <div>
          <label className='block text-white mb-1 font-medium'>
            Project Title
          </label>
          <input
            type='text'
            {...register('title', { required: 'Title is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-purple-400 transition'
            placeholder='e.g. Galactic Design Portal'
          />
          {errors.title && (
            <p className='text-red-400 text-sm mt-1'>{errors.title.message}</p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label className='block text-white mb-1 font-medium'>
            Category
          </label>
          <select
            {...register('categoryId', { required: 'Category is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/10 text-white outline-none border border-white/10 focus:border-purple-400 transition'
          >
            <option value='' className='bg-gray-800 text-white'>Select Category</option>
            {categoriesData?.data?.map((cat) => (
              <option key={cat._id} value={cat._id} className='bg-gray-800 text-white'>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className='text-red-400 text-sm mt-1'>{errors.categoryId.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className='block text-white mb-1 font-medium'>
            Description
          </label>
          <textarea
            rows={4}
            {...register('description', {
              required: 'Description is required',
            })}
            className='w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-purple-400 transition resize-none'
            placeholder='Briefly describe the project...'
          />
          {errors.description && (
            <p className='text-red-400 text-sm mt-1'>
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className='block text-white mb-1 font-medium'>
            Image URL (Cloudinary / Hosted)
          </label>
          <input
            type='text'
            {...register('image', { required: 'Image URL is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-purple-400 transition'
            placeholder='https://res.cloudinary.com/...'
          />
          {errors.image && (
            <p className='text-red-400 text-sm mt-1'>{errors.image.message}</p>
          )}
        </div>

        {/* Redirect URL */}
        <div>
          <label className='block text-white mb-1 font-medium'>
            Redirect URL
          </label>
          <input
            type='text'
            {...register('redirectUrl', { required: 'Redirect URL is required' })}
            className='w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-purple-400 transition'
            placeholder='https://example.com'
          />
          {errors.redirectUrl && (
            <p className='text-red-400 text-sm mt-1'>{errors.redirectUrl.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={isLoading}
          type='submit'
          className='w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:scale-[1.02] transition-transform'
        >
          {isLoading ? 'Submitting...' : 'Submit Project'}
        </button>
      </form>
      <Route link='/manage-projects/all-projects'>
        <ArrowRight className='w-5 h-5' />
      </Route>
    </>
  );
};

export default CreateProject;
