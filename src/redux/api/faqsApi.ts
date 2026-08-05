import { baseApi } from './baseApi';

export interface IFAQ {
  _id?: string;
  question: string;
  answer: string;
  iconName?: string;
  icon?: string;
  category?: string;
  order?: number;
}

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFAQs: builder.query<{ success: boolean; data: IFAQ[] }, void>({
      query: () => '/faqs',
      providesTags: ['FAQ'],
    }),
    createFAQ: builder.mutation<{ success: boolean; data: IFAQ }, Partial<IFAQ>>({
      query: (body) => ({
        url: '/faqs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FAQ'],
    }),
    updateFAQ: builder.mutation<{ success: boolean; data: IFAQ }, { id: string; body: Partial<IFAQ> }>({
      query: ({ id, body }) => ({
        url: `/faqs/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['FAQ'],
    }),
    deleteFAQ: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQ'],
    }),
  }),
});

export const {
  useGetAllFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqsApi;
