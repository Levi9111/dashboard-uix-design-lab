import { baseApi } from './baseApi';

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (formdata) => ({
        url: '/projects/create-project',
        method: 'POST',
        bosy: formdata,
      }),
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/update-project/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    getAllProjects: builder.query({
      query: () => ({
        url: `/projects`,
        method: 'GET',
      }),
    }),

    getSingleProject: builder.query({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: 'GET',
      }),
    }),

    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/delete-project/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useDeleteProjectMutation,
} = projectsApi;
