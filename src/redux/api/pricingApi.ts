import { baseApi } from './baseApi';

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPricingPlans: builder.query({
      query: () => ({
        url: '/pricing',
        method: 'GET',
      }),
    }),

    getSinglePricingPlan: builder.query({
      query: (id: string) => ({
        url: `/pricing/${id}`,
        method: 'GET',
      }),
    }),

    createPricingPlan: builder.mutation({
      query: (data) => ({
        url: '/pricing',
        method: 'POST',
        body: data,
      }),
    }),

    updatePricingPlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pricing/update-plan/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    deletePricingPlan: builder.mutation({
      query: (id: string) => ({
        url: `/pricing/delete-plan/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllPricingPlansQuery,
  useGetSinglePricingPlanQuery,
  useCreatePricingPlanMutation,
  useUpdatePricingPlanMutation,
  useDeletePricingPlanMutation,
} = pricingApi;
