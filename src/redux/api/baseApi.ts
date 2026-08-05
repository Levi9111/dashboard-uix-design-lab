import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_SERVER_URL || 'https://server-uix-design-lab.onrender.com/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState & { auth?: { accessToken?: string; acessToken?: string } };
    const token = state.auth?.accessToken || state.auth?.acessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['Category', 'Project', 'Review', 'FAQ', 'Pricing', 'SiteConfig', 'AboutUs', 'Feature', 'User'],
  endpoints: () => ({}),
});
