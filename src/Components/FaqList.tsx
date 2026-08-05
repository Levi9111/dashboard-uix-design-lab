import { useState } from 'react';
import { useGetAllFAQsQuery, useDeleteFAQMutation, type IFAQ } from '../redux/api/faqsApi';
import LoadingDesign from './designs/LoadingDesign';
import { Trash2, HelpCircle, Plus, Sparkles, Shield, Zap, Users, CreditCard, MessageSquare, Layers } from 'lucide-react';
import AlertModal from './ui/AlertModal';
import ToastMessage from './ui/ToastMessage';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Shield,
  Zap,
  Users,
  HelpCircle,
  CreditCard,
  MessageSquare,
  Layers,
};

const FaqList = () => {
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetAllFAQsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteFaq] = useDeleteFAQMutation();
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleConfirmDelete = async () => {
    if (!selectedIdToDelete) return;
    try {
      const result = await deleteFaq(selectedIdToDelete).unwrap();
      if (result.success) {
        setToast({ show: true, message: 'FAQ deleted successfully', type: 'success' });
        refetch();
      } else {
        setToast({ show: true, message: 'Failed to delete FAQ', type: 'error' });
      }
    } catch {
      setToast({ show: true, message: 'Failed to delete FAQ', type: 'error' });
    } finally {
      setSelectedIdToDelete(null);
    }
  };

  if (isLoading) return <LoadingDesign />;

  const faqs = response?.data || [];

  return (
    <div className='space-y-6'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} />

      {faqs.length === 0 ? (
        <div className='glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-4'>
          <div className='w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mx-auto'>
            <HelpCircle className='w-8 h-8' />
          </div>
          <h3 className='text-xl font-bold text-white font-outfit'>No FAQs Found</h3>
          <p className='text-sm text-gray-400 max-w-md mx-auto'>
            You haven't created any FAQ entries yet. Click below to add your first accordion question.
          </p>
          <Link
            to='/manage-faqs'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold text-sm hover:bg-pink-700 transition'
          >
            <Plus className='w-4 h-4' /> Add New FAQ
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {faqs.map((faq: IFAQ) => {
            const iconName = faq.icon || faq.iconName || 'HelpCircle';
            const IconComponent = iconMap[iconName] || HelpCircle;
            return (
              <div
                key={faq._id}
                className='glass-panel p-6 rounded-3xl border border-white/10 hover:border-pink-500/40 flex flex-col justify-between transition duration-300 group'
              >
                <div className='space-y-3'>
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-2.5'>
                      <div className='p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 group-hover:scale-110 transition'>
                        <IconComponent className='w-5 h-5' />
                      </div>
                      <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-pink-300 border border-white/10'>
                        {iconName}
                      </span>
                    </div>

                    <button
                      onClick={() => faq._id && setSelectedIdToDelete(faq._id)}
                      className='p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition'
                      title='Delete FAQ'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>

                  <h3 className='text-lg font-bold text-white font-outfit leading-snug group-hover:text-pink-300 transition'>
                    {faq.question}
                  </h3>

                  <p className='text-xs text-gray-300 leading-relaxed font-sans'>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedIdToDelete && (
        <AlertModal
          message='Are you sure you want to delete this FAQ?'
          onConfirm={handleConfirmDelete}
          onCancel={() => setSelectedIdToDelete(null)}
        />
      )}
    </div>
  );
};

export default FaqList;
