import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AnyARecord } from "dns";

export const artistProfileApi = createApi({
  reducerPath: "artistProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://online-marketplace-for-local-artists.onrender.com/",
    credentials: "include",
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
    getRisingArtists: builder.query<any, void>({
      query: () => ({
        url: `/artist/rising`,
        method: "GET",
      }),
      providesTags: ["ArtistProfile"],
    }),
    getBestsellingArtists: builder.query<any, void>({
      query: () => ({
        url: `/artist/bestselling`,
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

    followArtist: builder.mutation({
      query: (artistId: string) => ({
        url: `artist/follow`,
        method: "POST",
        body: { artist_id: artistId },
      }),
      invalidatesTags: ["ArtistProfile"],
    }),
    unfollowArtist: builder.mutation({
      query: (artistId: string) => ({
        url: `artist/unfollow`,
        method: "POST",
        body: { artist_id: artistId },
      }),
      invalidatesTags: ["ArtistProfile"],
    }),
    getArtistsFollowers: builder.query<any, string>({
      query: (id) => ({
        url: `/artist/${id}/followers`,
        method: "GET",
      }),
      providesTags: ["ArtistProfile"],
    }),
    getArtistsRatings: builder.query<any, string>({
      query: (id) => ({
        url: `/artist/${id}/ratings`,
        method: "GET",
      }),
      providesTags: ["ArtistProfile"],
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
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useGetArtistsFollowersQuery,
  useGetArtistsRatingsQuery,
  useGetBestsellingArtistsQuery,
  useGetRisingArtistsQuery,
} = artistProfileApi;
