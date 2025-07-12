import { baseApi } from './baseApi';

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (formdata) => ({
        url: '/reviews/create-review',
        method: 'POST',
        body: formdata,
      }),
    }),

    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/update-review/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    getAllReviews: builder.query({
      query: () => '/reviews',
    }),

    getSingleReview: builder.query({
      query: (id: string) => `/reviews/${id}`,
    }),

    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/reviews/delete-review/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useGetAllReviewsQuery,
  useGetSingleReviewQuery,
  useDeleteReviewMutation,
} = reviewsApi;
