import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artworkApi = createApi({
  reducerPath: "artworkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["Artwork", "Favorites", "Metadata"],
  endpoints: (builder) => ({
    getPublicArtworks: builder.query({
      query: (params) => ({
        url: "artwork/",
        params,
      }),
      providesTags: ["Artwork"],
    }),
    getArtworkById: builder.query({
      query: ({ id, sessionKey }) => ({
        url: `artwork/${id}`,
        method: "GET",
        headers: {
          "X-Session-Key": sessionKey,
        },
      }),
      providesTags: ["Artwork"],
    }),
    getMyArtworks: builder.query({
      query: (params) => ({
        url: `artwork/my-artworks/`,
        params,
      }),
      providesTags: ["Artwork"],
    }),
    getMyArtworksDetail: builder.query({
      query: (id) => ({
        url: `artwork/my-artworks/${id}`,
        method: "GET",
      }),
      providesTags: ["Artwork"],
    }),
    createArtwork: builder.mutation({
      query: (formData) => ({
        url: "artwork/my-artworks",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Artwork"],
    }),
    updateArtwork: builder.mutation({
      query: ({ id, formData }) => ({
        url: `artwork/my-artworks/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Artwork"],
    }),
    getMetadata: builder.query({
      query: () => "artwork/metadata/all",
      providesTags: ["Metadata"],
    }),
    deleteMyArtwork: builder.mutation({
      query: (id) => ({
        url: `artwork/my-artworks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artwork"],
    }),
    addToFavorites: builder.mutation({
      query: (data) => ({
        url: "artwork/wishlist/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeFromFavorites: builder.mutation({
      query: (id) => ({
        url: `artwork/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
    getTopFavorited: builder.query({
      query: () => "artwork/top-favorited",
      providesTags: ["Artwork"],
    }),
    getTopViewed: builder.query({
      query: () => "artwork/top-viewed",
      providesTags: ["Artwork"],
    }),
    getRecentlyViewed: builder.query({
      query: () => "artwork/recently-viewed",
      providesTags: ["Artwork"],
    }),
    getFavorites: builder.query({
      query: (params) => ({
        url: "artwork/wishlist/",
        method: "GET",
        params,
      }),
      providesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetPublicArtworksQuery,
  useGetArtworkByIdQuery,
  useGetMyArtworksQuery,
  useCreateArtworkMutation,
  useDeleteMyArtworkMutation,
  useGetMetadataQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetTopFavoritedQuery,
  useGetTopViewedQuery,
  useGetRecentlyViewedQuery,
  useGetFavoritesQuery,
  useGetMyArtworksDetailQuery,
  useUpdateArtworkMutation,
} = artworkApi;
