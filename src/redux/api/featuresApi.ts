import { baseApi } from './baseApi';

export interface IFeature {
  _id?: string;
  title: string;
  description: string;
  iconName: string;
  tag?: string;
  order?: number;
}

export const featuresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeatures: builder.query<{ success: boolean; data: IFeature[] }, void>({
      query: () => '/features',
      providesTags: ['Feature'],
    }),
    createFeature: builder.mutation<{ success: boolean; data: IFeature }, Partial<IFeature>>({
      query: (body) => ({
        url: '/features',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Feature'],
    }),
    updateFeature: builder.mutation<{ success: boolean; data: IFeature }, { id: string; body: Partial<IFeature> }>({
      query: ({ id, body }) => ({
        url: `/features/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Feature'],
    }),
    deleteFeature: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/features/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feature'],
    }),
  }),
});

export const {
  useGetAllFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featuresApi;
