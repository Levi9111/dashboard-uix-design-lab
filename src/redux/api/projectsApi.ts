import { baseApi } from './baseApi';
import type { ICategory } from './categoriesApi';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image: string;
  categoryId?: ICategory | string;
  category?: ICategory;
  redirectUrl: string;
}

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<{ success: boolean; data: IProject[] }, void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProjectById: builder.query<{ success: boolean; data: IProject }, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<{ success: boolean; data: IProject }, Partial<IProject>>({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<{ success: boolean; data: IProject }, { id: string; body: Partial<IProject> }>({
      query: ({ id, body }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
