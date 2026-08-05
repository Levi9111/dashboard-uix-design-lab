import { baseApi } from './baseApi';

export interface IReview {
  _id?: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  roi?: string;
  revenue?: string;
  avatarUrl?: string;
  color?: string;
  stats?: Record<string, string>;
}

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<{ success: boolean; data: IReview[] }, void>({
      query: () => '/reviews',
      providesTags: ['Review'],
    }),
    createReview: builder.mutation<{ success: boolean; data: IReview }, Partial<IReview>>({
      query: (body) => ({
        url: '/reviews',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Review'],
    }),
    updateReview: builder.mutation<{ success: boolean; data: IReview }, { id: string; body: Partial<IReview> }>({
      query: ({ id, body }) => ({
        url: `/reviews/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Review'],
    }),
    deleteReview: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
