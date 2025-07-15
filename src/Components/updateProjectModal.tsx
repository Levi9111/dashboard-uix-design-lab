import { useForm } from 'react-hook-form';
import { useUpdateProjectMutation } from '../redux/api/projectsApi';
import GalacticModal from './ui/GalacticModal';

interface Props {
  project: {
    _id: string;
    title: string;
    description: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateProjectModal = ({ project, onClose, onSuccess }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const onSubmit = async (data: { title: string; description: string }) => {
    try {
      console.log(data);

      const result = await updateProject({
        id: project._id,
        project: { data },
      }).unwrap();
      onSuccess();

      console.log(result);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <GalacticModal isOpen={true} onClose={onClose} title='Update Project'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 mt-6'>
        <div>
          <label className='block mb-1 font-semibold text-white'>Title</label>
          <input
            {...register('title', { required: true })}
            className='w-full px-4 py-2 rounded bg-white/10 text-white outline-none border border-white/20 focus:border-purple-500'
            placeholder='Enter title'
          />
        </div>

        <div>
          <label className='block mb-1 font-semibold text-white'>
            Description
          </label>
          <textarea
            rows={4}
            {...register('description', { required: true })}
            className='w-full px-4 py-2 rounded bg-white/10 text-white outline-none border border-white/20 focus:border-purple-500 resize-none'
            placeholder='Enter description'
          />
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

export default UpdateProjectModal;
