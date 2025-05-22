import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AnyARecord } from "dns";

export const artistProfileApi = createApi({
  reducerPath: "artistProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://online-marketplace-for-local-artists.onrender.com/', //removed /api
    // credentials: "include",  //removed for test
  }),
  tagTypes: ["ArtistProfile", "dashboard"],
  endpoints: (builder) => ({
    getArtistProfile: builder.query({
      query: () => "artist/profile",
      providesTags: ["ArtistProfile"],
    }),

    // test artists query
    //   getArtists: builder.query<any, void>({
    //   query: () => "/artists", 
    // }),

   getArtists: builder.query<any, void>({
      query: () => ({
        url: `/artist`,
        method: "GET",
      }),
    providesTags: ["ArtistProfile"],
    }),

    getArtistsById: builder.query<any, string>({
      query: (id) => ({
        url: `/artist/${id}`,
        method: "GET",
      }),
    providesTags: ["ArtistProfile"],
    }),

    updateArtistProfile: builder.mutation({
      query: (formData) => ({
        url: `artist/profile/update`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ArtistProfile"],
    }),
    updateEmail: builder.mutation({
      query: ({ ...updatedProfile }) => ({
        url: `artist/profile/change-email`,
        method: "POST",
        body: updatedProfile,
      }),
      invalidatesTags: ["ArtistProfile"],
    }),
    changePassword: builder.mutation({
      query: ({ ...updatedProfile }) => ({
        url: `artist/profile/change-password`,
        method: "POST",
        body: updatedProfile,
      }),
      invalidatesTags: ["ArtistProfile"],
    }),
    deactivateAccount: builder.mutation({
      query: () => ({
        url: `artist/profile/deactivate`,
        method: "POST",
      }),
      invalidatesTags: ["ArtistProfile"],
    }),
    getDashboardMetrics: builder.query({
      query: () => "artist/dashboard-metrics",
      providesTags: ["dashboard"],
    }),
    getDashBoardHistory: builder.query({
      query: () => "artist/dashboard-revenue-history",
      providesTags: ["dashboard"],
    }),
    getDashboardTopFavorited: builder.query({
      query: () => "artist/dashboard-top-favorited-artworks",
      providesTags: ["dashboard"],
    }),
    reviewArtist: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `artist/${id}/rate`,
        method: "POST",
        body: reviewData,
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
  useGetDashboardMetricsQuery,
  useGetDashBoardHistoryQuery,
  useGetDashboardTopFavoritedQuery,
  useGetArtistsQuery,
  useGetArtistsByIdQuery,
  useReviewArtistMutation,
} = artistProfileApi;




