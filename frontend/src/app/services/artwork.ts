import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your Artwork type (simplified example)
export interface Artwork {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description?: string;
  artistName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const artworkApi = createApi({
  reducerPath: "artworkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
  }),
  tagTypes: ["Artwork"], // Ensure this matches the tags you're using
  endpoints: (builder) => ({
    // General artworks list (optional)
    getAllArtworks: builder.query<Artwork[], void>({
      query: () => "/artworks",
      providesTags: ["Artwork"], // provides the "Artwork" tag for invalidation
    }),

    // Category-specific endpoints
    getFeaturedArtworks: builder.query<Artwork[], void>({
      query: () => "/artworks/featured",
      providesTags: ["Artwork"],
    }),
    getBestSellers: builder.query<Artwork[], void>({
      query: () => "/artworks/best-sellers",
      providesTags: ["Artwork"],
    }),
    getRecentlyReviewed: builder.query<Artwork[], void>({
      query: () => "/artworks/recently-reviewed",
      providesTags: ["Artwork"],
    }),
    getNewWorks: builder.query<Artwork[], void>({
      query: () => "/artworks/new",
      providesTags: ["Artwork"],
    }),
    getCuratorsPick: builder.query<Artwork[], void>({
      query: () => "/artworks/curators-pick",
      providesTags: ["Artwork"],
    }),

    // Fetch single artwork
    getArtworkById: builder.query<Artwork, number>({
      query: (id) => `/artworks/${id}`,
      providesTags: (result, error, id) => [{ type: "Artwork", id }],
    }),

    // New endpoint to upload artwork
    uploadArtwork: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/artworks/upload", // Assuming this is the endpoint to handle artwork upload
        method: "POST",
        body: formData, // Sending the FormData object containing the artwork data
        headers: {
          "Content-Type": "multipart/form-data", // Make sure the content type is multipart
        },
      }),
      // Optional: You can invalidate tags or refetch data after a successful upload
      invalidatesTags: [{ type: "Artwork", id: "LIST" }], // Invalidate if necessary
    }),
  }),
});

export const {
  useGetAllArtworksQuery,
  useGetFeaturedArtworksQuery,
  useGetBestSellersQuery,
  useGetRecentlyReviewedQuery,
  useGetNewWorksQuery,
  useGetCuratorsPickQuery,
  useGetArtworkByIdQuery,
  useUploadArtworkMutation, // Expose upload artwork mutation
} = artworkApi;
