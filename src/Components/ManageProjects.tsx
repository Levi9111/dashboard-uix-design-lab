import { useForm } from 'react-hook-form';
import { PlanetText } from './elements/PlanetText';

type ProjectFormData = {
  title: string;
  description: string;
  image: FileList;
};

const ManageProjects = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const onSubmit = (data: ProjectFormData) => {
    console.log('Submitted:', {
      title: data.title,
      description: data.description,
      image: data.image?.[0],
    });
    reset();
  };

  return (
    <div className='py-24 px-4'>
      <PlanetText
        title='Manage Website Projects'
        subtitle='Add or update featured projects displayed on the site.'
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

        {/* Description */}
        <div>
          <label className='block text-white mb-1 font-medium'>
            Description
          </label>
          <textarea
            rows={5}
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

        {/* Image */}
        <div>
          <label className='block text-white mb-1 font-medium'>
            Project Image
          </label>
          <input
            type='file'
            accept='image/*'
            {...register('image', { required: 'Image is required' })}
            className='block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30'
          />
          {errors.image && (
            <p className='text-red-400 text-sm mt-1'>{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type='submit'
          className='w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:scale-[1.02] transition-transform'
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ManageProjects;
