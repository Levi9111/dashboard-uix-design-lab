import { ArrowRight, Pencil, Trash2 } from 'lucide-react';
import Route from './elements/Route';
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from '../redux/api/projectsApi';
import { useState } from 'react';
import UpdateProjectModal from './updateProjectModal';

const ProjectsList = () => {
  const {
    data: projects,
    isLoading,
    refetch,
  } = useGetAllProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteProject] = useDeleteProjectMutation();
  const [editingProject, setEditingProject] = useState<null | {
    _id: string;
    title: string;
    description: string;
  }>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      refetch();
    }
  };

  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <div className='flex justify-between items-center mb-10'>
        <h2 className='text-2xl font-bold text-white'>All Projects</h2>
        <Route link='/manage-projects/'>
          <ArrowRight className='w-5 h-5 rotate-180' />
        </Route>
      </div>

      {isLoading ? (
        <p className='text-white'>Loading projects...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects?.data.map((project: any) => (
            <div
              key={project._id}
              className='bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 shadow-md text-white relative group'
            >
              <img
                src={project.projectImageUrl}
                alt={project.title}
                className='w-full h-40 object-cover rounded-md mb-4'
              />
              <h3 className='text-lg font-semibold'>{project.title}</h3>
              <p className='text-sm text-gray-300 mt-1'>
                {project.description}
              </p>

              <div className='flex gap-3 mt-4'>
                <button
                  onClick={() =>
                    setEditingProject({
                      _id: project._id,
                      title: project.title,
                      description: project.description,
                    })
                  }
                  className='flex items-center gap-1 px-3 py-1 bg-blue-600/80 hover:bg-blue-700 text-sm rounded-lg transition'
                >
                  <Pencil className='w-4 h-4' /> Update
                </button>

                <button
                  onClick={() => handleDelete(project._id)}
                  className='flex items-center gap-1 px-3 py-1 bg-red-600/80 hover:bg-red-700 text-sm rounded-lg transition'
                >
                  <Trash2 className='w-4 h-4' /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
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
    </div>
  );
};

export default ProjectsList;
