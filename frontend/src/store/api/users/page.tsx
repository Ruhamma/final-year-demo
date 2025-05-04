import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artistProfileApi = createApi({
  reducerPath: 'artistProfileApi',
  baseQuery:fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API || 'http://localhost:8000/api',
      credentials: 'include', 
    }),
  endpoints: (builder) => ({
    getuserProfile: builder.query({
      query: () => 'user/profile/',
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: `user/me/`,
        method: 'PUT',
        body: formData,
      }),
    }),
    updateEmail: builder.mutation({
      query: ({...updatedProfile }) => ({
        url: `users/profile/change-email`,
        method: 'POST',
        body: updatedProfile,
      }),
    }),
    changePassword: builder.mutation({
      query: ({...updatedProfile }) => ({
        url: `user/change-password`,
        method: 'POST',
        body: updatedProfile,
      }),
    }),
    deactivateAccount: builder.mutation({
      query: (body) => ({
        url: `user/delete-account`,
        method: 'POST',
        body
      }),
    }),
  }),
});

export const {
    useChangePasswordMutation,
    useDeactivateAccountMutation
} = artistProfileApi;