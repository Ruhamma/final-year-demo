import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artistProfileApi = createApi({
  reducerPath: 'artistProfileApi',
  baseQuery:fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API || 'http://localhost:8000/api',
      credentials: 'include', // Important for cookies
    }),
  endpoints: (builder) => ({
    getArtistProfile: builder.query({
      query: () => 'artist/profile/',
    }),
    updateArtistProfile: builder.mutation({
      query: ({...updatedProfile }) => ({
        url: `artist/profile/update`,
        method: 'PUT',
        body: updatedProfile,
      }),
    }),
    updateEmail: builder.mutation({
      query: ({...updatedProfile }) => ({
        url: `artist/profile/change-email`,
        method: 'POST',
        body: updatedProfile,
      }),
    }),
    changePassword: builder.mutation({
      query: ({...updatedProfile }) => ({
        url: `artist/profile/change-password`,
        method: 'POST',
        body: updatedProfile,
      }),
    }),
    deactivateAccount: builder.mutation({
      query: (body) => ({
        url: `artist/profile/deactivate`,
        method: 'POST',
        body
      }),
    }),
  }),
});

export const {
  useGetArtistProfileQuery,
  useUpdateArtistProfileMutation,
  useUpdateEmailMutation,
  useChangePasswordMutation,
  useDeactivateAccountMutation,
} = artistProfileApi;