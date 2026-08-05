import { baseApi } from './baseApi';

export interface IPricingPlan {
  _id?: string;
  title: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  order?: number;
}

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPricingPlans: builder.query<{ success: boolean; data: IPricingPlan[] }, void>({
      query: () => '/pricing',
      providesTags: ['Pricing'],
    }),
    createPricingPlan: builder.mutation<{ success: boolean; data: IPricingPlan }, Partial<IPricingPlan>>({
      query: (body) => ({
        url: '/pricing',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Pricing'],
    }),
    updatePricingPlan: builder.mutation<{ success: boolean; data: IPricingPlan }, { id: string; body: Partial<IPricingPlan> }>({
      query: ({ id, body }) => ({
        url: `/pricing/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Pricing'],
    }),
    deletePricingPlan: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/pricing/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pricing'],
    }),
  }),
});

export const {
  useGetAllPricingPlansQuery,
  useCreatePricingPlanMutation,
  useUpdatePricingPlanMutation,
  useDeletePricingPlanMutation,
} = pricingApi;
