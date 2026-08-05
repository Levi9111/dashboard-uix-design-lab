import { useState } from 'react';
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  type ICategory,
} from '../redux/api/categoriesApi';
import LoadingDesign from './designs/LoadingDesign';
import { Plus, Trash2, Tag, Layers } from 'lucide-react';
import ToastMessage from './ui/ToastMessage';
import AlertModal from './ui/AlertModal';

const CategoryManager = () => {
  const { data: categoryResponse, isLoading, refetch } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [categoryName, setCategoryName] = useState('');
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      const result = await createCategory({ name: categoryName.trim() }).unwrap();
      if (result.success) {
        setToast({ show: true, message: 'Category created successfully', type: 'success' });
        setCategoryName('');
        refetch();
      }
    } catch {
      setToast({ show: true, message: 'Failed to create category', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!selectedIdToDelete) return;
    try {
      await deleteCategory(selectedIdToDelete).unwrap();
      setToast({ show: true, message: 'Category deleted successfully', type: 'success' });
      refetch();
    } catch {
      setToast({ show: true, message: 'Failed to delete category', type: 'error' });
    } finally {
      setSelectedIdToDelete(null);
    }
  };

  if (isLoading) return <LoadingDesign />;

  const categories = categoryResponse?.data || [];

  return (
    <div className='py-28 max-w-5xl mx-auto px-6 space-y-10'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} />

      {/* Header */}
      <div className='glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div>
          <div className='flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2'>
            <Layers className='w-4 h-4' />
            <span>PORTFOLIO TAXONOMY</span>
          </div>
          <h1 className='text-3xl font-extrabold text-white font-outfit'>Project Categories</h1>
          <p className='text-gray-400 text-sm mt-1'>
            Manage pre-saved categories used for classifying portfolio projects in the database.
          </p>
        </div>

        <form onSubmit={handleCreate} className='flex items-center gap-3 w-full md:w-auto'>
          <input
            type='text'
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder='New Category Name...'
            className='px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white outline-none focus:border-cyan-500 text-sm w-full md:w-64'
          />
          <button
            type='submit'
            disabled={isCreating}
            className='flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg transition shrink-0'
          >
            <Plus className='w-4 h-4' />
            <span>{isCreating ? 'Adding...' : 'Add'}</span>
          </button>
        </form>
      </div>

      {/* Categories Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {categories.map((cat: ICategory) => (
          <div
            key={cat._id}
            className='glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between hover:border-cyan-500/40 transition group'
          >
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition'>
                <Tag className='w-5 h-5' />
              </div>
              <div>
                <h3 className='font-bold text-white font-outfit'>{cat.name}</h3>
                <p className='text-xs text-gray-400 font-mono'>/{cat.slug || cat.name.toLowerCase()}</p>
              </div>
            </div>

            <button
              onClick={() => cat._id && setSelectedIdToDelete(cat._id)}
              className='p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition'
              title='Delete Category'
            >
              <Trash2 className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>

      {selectedIdToDelete && (
        <AlertModal
          message='Are you sure you want to delete this category?'
          onConfirm={handleDelete}
          onCancel={() => setSelectedIdToDelete(null)}
        />
      )}
    </div>
  );
};

export default CategoryManager;
