import { useForm } from 'react-hook-form';
import { useUpdateProjectMutation } from '../redux/api/projectsApi';

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
    await updateProject({ id: project._id, data });
    onSuccess();
  };

  return (
    <div className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white rounded-xl p-6 max-w-md w-full space-y-4'
      >
        <h2 className='text-lg font-bold'>Update Project</h2>

        <div>
          <label className='block text-sm font-medium'>Title</label>
          <input
            type='text'
            {...register('title', { required: true })}
            className='w-full border px-3 py-2 rounded mt-1'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Description</label>
          <textarea
            {...register('description', { required: true })}
            className='w-full border px-3 py-2 rounded mt-1'
          />
        </div>

        <div className='flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 border rounded bg-gray-200'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProjectModal;
