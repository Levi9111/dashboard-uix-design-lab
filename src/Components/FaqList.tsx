import { useState } from 'react';
import { useGetAllFaqsQuery, useDeleteFaqMutation } from '../redux/api/faqsApi';
import LoadingDesign from './designs/LoadingDesign';
import { ArrowRight, Trash } from 'lucide-react';
import AlertModal from './ui/AlertModal';
import ToastMessage from './ui/ToastMessage';
import { useNavigate } from 'react-router-dom';

const FaqList = () => {
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetAllFaqsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteFaq] = useDeleteFaqMutation();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      const result = await deleteFaq(selectedId).unwrap();

      console.log(result);

      setToast({
        show: true,
        message: 'FAQ deleted successfully',
        type: 'success',
      });
      refetch();
    } catch {
      setToast({ show: true, message: 'Failed to delete FAQ', type: 'error' });
    } finally {
      setSelectedId(null);
      setTimeout(() => setToast({ ...toast, show: false }), 30000);
    }
  };

  if (isLoading) return <LoadingDesign />;

  const goToManageFaqs = () => {
    navigate('/manage-faqs');
  };

  return (
    <>
      <div className='mt-16 uix-center space-y-6 relative'>
        {response?.data?.map(
          (faq: { _id: string; question: string; answer: string }) => (
            <div
              key={faq._id}
              className='relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 text-white shadow'
            >
              <h3 className='text-lg font-semibold'>{faq.question}</h3>
              <p className='text-sm mt-2 text-gray-300'>{faq.answer}</p>
              <button
                onClick={() => handleDeleteClick(faq._id)}
                className='absolute top-4 right-4 text-red-400 hover:text-red-500 transition'
                title='Delete FAQ'
              >
                <Trash className='w-5 h-5' />
              </button>
            </div>
          ),
        )}

        {/* Alert modal */}
        {selectedId && (
          <AlertModal
            message='Are you sure you want to delete this FAQ?'
            onConfirm={handleConfirmDelete}
            onCancel={() => setSelectedId(null)}
          />
        )}

        {/* Toast message */}
        <ToastMessage
          show={toast.show}
          message={toast.message}
          type={toast.type}
        />
      </div>

      <button
        onClick={goToManageFaqs}
        className='fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50'
        title='Go to All FAQs'
      >
        <ArrowRight className='w-5 h-5 rotate-180' />
      </button>
    </>
  );
};

export default FaqList;
