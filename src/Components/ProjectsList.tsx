import { Pencil, Trash2, ExternalLink, FolderKanban, Plus } from 'lucide-react';
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  type IProject,
} from '../redux/api/projectsApi';
import { useState } from 'react';
import UpdateProjectModal from './updateProjectModal';
import LoadingDesign from './designs/LoadingDesign';
import ToastMessage from './ui/ToastMessage';
import AlertModal from './ui/AlertModal';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
  const {
    data: projects,
    isLoading,
    refetch,
  } = useGetAllProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteProject] = useDeleteProjectMutation();
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<null | {
    _id: string;
    title: string;
    description: string;
  }>(null);

  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleDelete = async () => {
    if (!selectedIdToDelete) return;
    try {
      await deleteProject(selectedIdToDelete).unwrap();
      setToast({ show: true, message: 'Project deleted successfully', type: 'success' });
      refetch();
    } catch {
      setToast({ show: true, message: 'Failed to delete project', type: 'error' });
    } finally {
      setSelectedIdToDelete(null);
    }
  };

  if (isLoading) return <LoadingDesign />;

  const projectItems = projects?.data || [];

  return (
    <div className='space-y-6'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} />

      {projectItems.length === 0 ? (
        <div className='glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-4'>
          <div className='w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto'>
            <FolderKanban className='w-8 h-8' />
          </div>
          <h3 className='text-xl font-bold text-white font-outfit'>No Projects Found</h3>
          <p className='text-sm text-gray-400 max-w-md mx-auto'>
            You haven't added any portfolio projects yet. Click below to add your first showcase item.
          </p>
          <Link
            to='/manage-projects'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition'
          >
            <Plus className='w-4 h-4' /> Add New Project
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projectItems.map((project: IProject) => (
            <div
              key={project._id}
              className='glass-panel rounded-3xl border border-white/10 hover:border-purple-500/40 overflow-hidden flex flex-col justify-between group transition duration-300'
            >
              <div>
                <div className='relative h-48 overflow-hidden bg-gray-900'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
                  />
                  {project.category && (
                    <div className='absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-purple-300 text-xs font-semibold border border-white/10'>
                      {project.category.name}
                    </div>
                  )}
                </div>

                <div className='p-6 space-y-2'>
                  <h3 className='text-xl font-bold text-white font-outfit group-hover:text-purple-300 transition'>
                    {project.title}
                  </h3>
                  <p className='text-xs text-gray-400 line-clamp-3 leading-relaxed'>
                    {project.description}
                  </p>
                </div>
              </div>

              <div className='p-6 pt-0 border-t border-white/5 mt-4 space-y-4'>
                {project.redirectUrl && (
                  <a
                    href={project.redirectUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition font-medium'
                  >
                    <ExternalLink className='w-3.5 h-3.5' />
                    <span className='truncate max-w-[200px]'>{project.redirectUrl}</span>
                  </a>
                )}

                <div className='flex items-center justify-between gap-3 pt-3 border-t border-white/10'>
                  <button
                    onClick={() =>
                      setEditingProject({
                        _id: project._id || '',
                        title: project.title,
                        description: project.description,
                      })
                    }
                    className='flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-600 hover:text-white transition text-xs font-semibold'
                  >
                    <Pencil className='w-3.5 h-3.5' /> Edit
                  </button>

                  <button
                    onClick={() => project._id && setSelectedIdToDelete(project._id)}
                    className='flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition text-xs font-semibold'
                  >
                    <Trash2 className='w-3.5 h-3.5' /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProject && (
        <UpdateProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={() => {
            setEditingProject(null);
            refetch();
          }}
        />
      )}

      {/* Alert Delete Modal */}
      {selectedIdToDelete && (
        <AlertModal
          message='Are you sure you want to delete this project?'
          onConfirm={handleDelete}
          onCancel={() => setSelectedIdToDelete(null)}
        />
      )}
    </div>
  );
};

export default ProjectsList;
