import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artworkApi = createApi({
  reducerPath: 'artworkApi',
  baseQuery:fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || 'http://localhost:8000/api',
    credentials: 'include', // Important for cookies
  }),
  endpoints: (builder) => ({
    getArtworks: builder.query({
      query: () => 'artwork/artworks',
    }),
    getMyArtwork: builder.query({
      query: () => 'artwork/my-artworks',
    }),
    getArtworkMetadata: builder.query({
      query: () => 'artwork/metadata',
    }),
    createArtwork: builder.mutation({
      query: (newArtwork) => ({
        url: 'artwork/my-artworks',
        method: 'POST',
        body: newArtwork,
      }),
    }),
    updateArtwork: builder.mutation({
      query: ({ id, ...updatedArtwork }) => ({
        url: `artwork/artworks/${id}`,
        method: 'PUT',
        body: updatedArtwork,
      }),
    }),
    deleteArtwork: builder.mutation({
      query: (id) => ({
        url: `artwork/artworks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetArtworksQuery,
  useGetMyArtworkQuery,
  useCreateArtworkMutation,
  useUpdateArtworkMutation,
  useDeleteArtworkMutation,
  useGetArtworkMetadataQuery
} = artworkApi;