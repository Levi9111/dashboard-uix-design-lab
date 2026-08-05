import { Pencil, Trash2, MessageSquareQuote, Plus, TrendingUp, Award } from 'lucide-react';
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from '../redux/api/reviewsApi';
import LoadingDesign from './designs/LoadingDesign';
import { useState } from 'react';
import AlertModal from './ui/AlertModal';
import UpdateReviewModal from './updateReviewsModal';
import ToastMessage from './ui/ToastMessage';
import { Link } from 'react-router-dom';

export interface Review {
  _id: string;
  name: string;
  role: string;
  company?: string;
  testimonial?: string;
  description?: string;
  roi?: string;
  revenue?: string;
  avatarUrl?: string;
  stats?: {
    [key: string]: string;
  };
}

const ReviewsList = () => {
  const { data, isLoading, refetch } = useGetAllReviewsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteReview] = useDeleteReviewMutation();
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleDelete = async () => {
    if (!selectedIdToDelete) return;
    try {
      await deleteReview(selectedIdToDelete).unwrap();
      setToast({ show: true, message: 'Review deleted successfully', type: 'success' });
      refetch();
    } catch {
      setToast({ show: true, message: 'Failed to delete review', type: 'error' });
    } finally {
      setSelectedIdToDelete(null);
    }
  };

  if (isLoading) return <LoadingDesign />;

  const reviews = (data?.data || []) as Review[];

  return (
    <div className='space-y-6'>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} />

      {reviews.length === 0 ? (
        <div className='glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-4'>
          <div className='w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto'>
            <MessageSquareQuote className='w-8 h-8' />
          </div>
          <h3 className='text-xl font-bold text-white font-outfit'>No Client Reviews Found</h3>
          <p className='text-sm text-gray-400 max-w-md mx-auto'>
            You haven't added any client testimonials yet. Click below to submit your first case study.
          </p>
          <Link
            to='/manage-reviews'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold text-sm hover:bg-cyan-700 transition'
          >
            <Plus className='w-4 h-4' /> Add New Review
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {reviews.map((review: Review) => (
            <div
              key={review._id}
              className='glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between transition duration-300 group'
            >
              <div className='space-y-4'>
                {/* Header Profile */}
                <div className='flex items-center gap-3.5'>
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      className='w-12 h-12 rounded-2xl object-cover border border-white/20'
                    />
                  ) : (
                    <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-lg font-bold font-outfit shadow-md'>
                      {review.name ? review.name.charAt(0) : 'U'}
                    </div>
                  )}

                  <div>
                    <h3 className='font-bold text-white font-outfit group-hover:text-cyan-300 transition'>
                      {review.name}
                    </h3>
                    <p className='text-xs text-gray-400'>
                      {review.role} {review.company ? `• ${review.company}` : ''}
                    </p>
                  </div>
                </div>

                {/* Testimonial body */}
                <p className='text-xs text-gray-300 italic leading-relaxed line-clamp-4 font-sans bg-white/[0.02] p-3.5 rounded-xl border border-white/5'>
                  "{review.testimonial || review.description}"
                </p>

                {/* Badges: ROI & Revenue */}
                <div className='flex flex-wrap items-center gap-2'>
                  {review.roi && (
                    <span className='inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'>
                      <TrendingUp className='w-3 h-3' /> ROI: {review.roi}
                    </span>
                  )}
                  {review.revenue && (
                    <span className='inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'>
                      <Award className='w-3 h-3' /> Rev: {review.revenue}
                    </span>
                  )}
                </div>

                {/* Stats */}
                {review.stats && Object.keys(review.stats).length > 0 && (
                  <div className='grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs'>
                    {Object.entries(review.stats).map(([key, val]) => (
                      <div key={key} className='bg-white/5 p-2 rounded-lg border border-white/5 text-center'>
                        <span className='block font-bold text-white font-outfit'>{val}</span>
                        <span className='text-[10px] text-gray-400 capitalize'>{key}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className='flex items-center justify-between gap-3 pt-4 border-t border-white/10 mt-4'>
                <button
                  onClick={() => setSelectedReview(review)}
                  className='flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-600 hover:text-white transition text-xs font-semibold'
                >
                  <Pencil className='w-3.5 h-3.5' /> Edit
                </button>

                <button
                  onClick={() => review._id && setSelectedIdToDelete(review._id)}
                  className='flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition text-xs font-semibold'
                >
                  <Trash2 className='w-3.5 h-3.5' /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Review Modal */}
      {selectedReview && (
        <UpdateReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onSuccess={() => {
            setSelectedReview(null);
            refetch();
          }}
        />
      )}

      {/* Delete Confirmation Alert */}
      {selectedIdToDelete && (
        <AlertModal
          message='Are you sure you want to delete this client review?'
          onConfirm={handleDelete}
          onCancel={() => setSelectedIdToDelete(null)}
        />
      )}
    </div>
  );
};

export default ReviewsList;
