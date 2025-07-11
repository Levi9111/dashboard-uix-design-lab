import { baseApi } from './baseApi';

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqs: builder.query({
      query: () => ({
        url: '/faqs',
        method: 'GET',
      }),
    }),

    getSingleFaq: builder.query({
      query: (id: string) => ({
        url: `/faqs/${id}`,
        method: 'GET',
      }),
    }),

    createFaq: builder.mutation({
      query: (data) => ({
        url: '/faqs',
        method: 'POST',
        body: data,
      }),
    }),

    updateFaq: builder.mutation({
      query: (id: string) => ({
        url: `/faqs/update-faq/${id}`,
        method: 'PATCH',
      }),
    }),

    deleteFaq: builder.mutation({
      query: (id: string) => ({
        url: `/faqs/delete-faq/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllFaqsQuery,
  useGetSingleFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;
