import { baseApi } from './baseApi';

export const featuresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeatures: builder.query({
      query: () => ({
        url: '/features',
        method: 'GET',
      }),
    }),

    getSingleFeature: builder.query({
      query: (id: string) => ({
        url: `/features/${id}`,
        method: 'GET',
      }),
    }),

    createFeature: builder.mutation({
      query: (data) => ({
        url: '/features',
        method: 'POST',
        body: data,
      }),
    }),

    updateFeature: builder.mutation({
      query: ({ id, data }) => ({
        url: `/features/update-feature/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    deleteFeature: builder.mutation({
      query: (id: string) => ({
        url: `/features/delete-feature/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllFeaturesQuery,
  useGetSingleFeatureQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featuresApi;
