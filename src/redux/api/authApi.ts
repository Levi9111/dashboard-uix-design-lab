import { baseApi } from './baseApi';
import type { AuthUser } from '../slices/authSlice';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<{ success: boolean; data: AuthUser }, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
