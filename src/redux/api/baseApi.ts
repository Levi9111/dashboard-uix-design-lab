import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_SERVER_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState & { auth: { acessToken?: string } };
    const token = state.auth?.acessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
