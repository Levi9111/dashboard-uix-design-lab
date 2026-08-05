import { baseApi } from './baseApi';

export interface ISocialLinks {
  behance?: string;
  instagram?: string;
  linkedin?: string;
  dribbble?: string;
}

export interface ISiteConfig {
  _id?: string;
  primaryEmail: string;
  phone: string;
  location: string;
  calendlyUrl: string;
  telegramLink: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  socialLinks: ISocialLinks;
}

export const siteConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSiteConfig: builder.query<{ success: boolean; data: ISiteConfig }, void>({
      query: () => '/site-config',
      providesTags: ['SiteConfig'],
    }),
    updateSiteConfig: builder.mutation<{ success: boolean; data: ISiteConfig }, Partial<ISiteConfig>>({
      query: (body) => ({
        url: '/site-config',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['SiteConfig'],
    }),
  }),
});

export const { useGetSiteConfigQuery, useUpdateSiteConfigMutation } = siteConfigApi;
