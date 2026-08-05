import { useForm } from 'react-hook-form';
import { useUpdateProjectMutation } from '../redux/api/projectsApi';
import GalacticModal from './ui/GalacticModal';
import { useState } from 'react';
import ToastMessage from './ui/ToastMessage';

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
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  const onSubmit = async (data: { title: string; description: string }) => {
    try {
      const result = await updateProject({
        id: project._id,
        body: data,
      }).unwrap();

      if (result.success) {
        onSuccess();
        setToast({
          show: true,
          message: 'Project updated successfully',
          type: 'success',
        });
      } else {
        setToast({
          show: true,
          message: 'Failed to update project',
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
    <GalacticModal isOpen={true} onClose={onClose} title='Update Project Details'>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 mt-4'>
        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
            Project Title
          </label>
          <input
            {...register('title', { required: true })}
            className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500 text-sm'
            placeholder='Enter title'
          />
        </div>

        <div>
          <label className='block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5'>
            Project Description
          </label>
          <textarea
            rows={4}
            {...register('description', { required: true })}
            className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-purple-500 text-sm resize-none'
            placeholder='Enter description'
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
            className='px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition text-xs'
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </GalacticModal>
  );
};

export default UpdateProjectModal;
