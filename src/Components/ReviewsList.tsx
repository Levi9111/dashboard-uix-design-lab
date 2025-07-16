import { ArrowRight, Pencil, Trash2 } from 'lucide-react';
import Route from './elements/Route';
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from '../redux/api/reviewsApi';
import LoadingDesign from './designs/LoadingDesign';
import { useState } from 'react';
import AlertModal from './ui/AlertModal';
import UpdateReviewModal from './updateReviewsModal';

export interface Review {
  _id: string;
  title: string;
  name: string;
  role: string;
  description: string;
  roi: string;
  revenue: string;
  avatarInitials: string;
  imageUrl: string;
  stats: {
    [key: string]: string;
  };
  isDeleted: boolean;
}

const ReviewsList = () => {
  const { data, isLoading, refetch } = useGetAllReviewsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteReview] = useDeleteReviewMutation();
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const reviews = data?.data;

  const handleDelete = async (id: string) => {
    setSelectedReviewId(id);
    if (selectedReviewId) {
      try {
        await deleteReview(selectedReviewId).unwrap();
        refetch();
        setSelectedReviewId(null);
      } catch (err) {
        console.error('Failed to delete review:', err);
      }
    }
  };
  const handleUpdate = (review: Review) => {
    setSelectedReview(review);
  };

  if (isLoading) {
    return <LoadingDesign />;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className='text-center text-white mt-8'>
        No reviews found.
        <Route link='/manage-reviews/' className='!h-4'>
          <ArrowRight className='w-5 h-5 rotate-180 inline ml-2' />
        </Route>
      </div>
    );
  }

  return (
    <>
      <div className='max-w-6xl mx-auto px-4 mt-12'>
        <h2 className='text-white text-2xl font-semibold mb-6'>All Reviews</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {reviews.map((review: Review) => (
            <div
              key={review._id}
              className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-white shadow-md space-y-4'
            >
              <div className='flex items-center space-x-4'>
                {review.imageUrl ? (
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className='w-12 h-12 rounded-full object-cover border border-white/20'
                  />
                ) : (
                  <div className='w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-lg font-bold'>
                    {review.avatarInitials}
                  </div>
                )}
                <div>
                  <p className='font-semibold'>{review.name}</p>
                  <p className='text-sm text-gray-400'>{review.role}</p>
                </div>
              </div>

              <div>
                <h3 className='text-lg font-bold'>{review.title}</h3>
                <p className='text-sm text-gray-300'>{review.description}</p>
              </div>

              <div className='grid grid-cols-2 gap-2 text-sm text-gray-300'>
                <p>
                  <strong>ROI:</strong> {review.roi || '—'}
                </p>
                <p>
                  <strong>Revenue:</strong> {review.revenue || '—'}
                </p>
              </div>

              {review.stats && (
                <div className='border-t border-white/10 pt-2 text-sm text-gray-300 space-y-1'>
                  {Object.entries(review.stats).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>
              )}

              <div className='flex justify-between items-center pt-2 border-t border-white/10'>
                <button
                  onClick={() => handleUpdate(review)}
                  className='flex items-center text-blue-400 hover:underline text-sm'
                >
                  <Pencil className='w-4 h-4 mr-1' /> Update
                </button>

                <button
                  onClick={() => handleDelete(review._id)}
                  className='flex items-center text-red-400 hover:underline text-sm'
                >
                  <Trash2 className='w-4 h-4 mr-1' /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Route link='/manage-reviews/'>
        <ArrowRight className='w-5 h-5 rotate-180' />
      </Route>
      {selectedReviewId && (
        <AlertModal
          message='Are you sure you want to delete this review?'
          onConfirm={() => selectedReviewId && handleDelete(selectedReviewId)}
          onCancel={() => setSelectedReviewId(null)}
        />
      )}
      {selectedReview && (
        <UpdateReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onSuccess={() => {
            refetch();
            setSelectedReview(null);
          }}
        />
      )}
    </>
  );
};

export default ReviewsList;
