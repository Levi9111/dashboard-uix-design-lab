import { baseApi } from './baseApi';

export interface IStatItem {
  label: string;
  value: string;
}

export interface IValueItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface IAboutUs {
  _id?: string;
  title: string;
  subtitle: string;
  stats: IStatItem[];
  values: IValueItem[];
}

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query<{ success: boolean; data: IAboutUs }, void>({
      query: () => '/about-us',
      providesTags: ['AboutUs'],
    }),
    updateAboutUs: builder.mutation<{ success: boolean; data: IAboutUs }, Partial<IAboutUs>>({
      query: (body) => ({
        url: '/about-us',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['AboutUs'],
    }),
  }),
});

export const { useGetAboutUsQuery, useUpdateAboutUsMutation } = aboutUsApi;
