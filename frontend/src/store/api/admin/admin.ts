import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api/admin",
    credentials: "include",
  }),
  tagTypes: ["Users", "Artists", "Artworks", "Metadata", "Orders", "Analytics"],
  endpoints: (build) => ({
    listUsers: build.query<any, { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 20 }) =>
        `/users/?skip=${skip}&limit=${limit}`,
      providesTags: ["Users"],
    }),
    getUser: build.query<any, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    updateUser: build.mutation<any, { userId: string; updates: any }>({
      query: ({ userId, updates }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Users", id: userId },
      ],
    }),
    deactivateUser: build.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    listArtists: build.query<
      any,
      {
        is_verified?: boolean;
        is_active?: boolean;
        limit?: number;
        offset?: number;
      }
    >({
      query: ({ is_verified, is_active, limit = 10, offset = 0 }) => {
        const params = new URLSearchParams();
        if (is_verified !== undefined)
          params.append("is_verified", String(is_verified));
        if (is_active !== undefined)
          params.append("is_active", String(is_active));
        params.append("limit", String(limit));
        params.append("offset", String(offset));
        return `/artists/?${params.toString()}`;
      },
      providesTags: ["Artists"],
    }),
    getArtist: build.query<any, string>({
      query: (artistId) => `/artists/${artistId}`,
      providesTags: (result, error, id) => [{ type: "Artists", id }],
    }),
    verifyArtist: build.mutation<any, string>({
      query: (artistId) => ({
        url: `/artists/${artistId}/verify`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Artists", id }],
    }),
    deactivateArtist: build.mutation<any, string>({
      query: (artistId) => ({
        url: `/artists/${artistId}/deactivate`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Artists", id }],
    }),

    // Artworks
    listArtworks: build.query<
      any,
      {
        skip?: number;
        limit?: number;
        category_id?: string;
        medium_id?: string;
        style_id?: string;
        artist_id?: string;
        is_featured?: boolean;
        is_active?: boolean;
        price_min?: number;
        price_max?: number;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) searchParams.append(key, String(value));
        });
        return `/artworks?${searchParams.toString()}`;
      },
      providesTags: ["Artworks"],
    }),
    getArtwork: build.query<any, string>({
      query: (artworkId) => `/artworks/${artworkId}`,
      providesTags: (result, error, id) => [{ type: "Artworks", id }],
    }),
    toggleFeatureArtwork: build.mutation<
      any,
      { artworkId: string; feature: boolean }
    >({
      query: ({ artworkId, feature }) => ({
        url: `/artworks/${artworkId}/feature?feature=${feature}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { artworkId }) => [
        { type: "Artworks", id: artworkId },
      ],
    }),
    toggleActivateArtwork: build.mutation<
      any,
      { artworkId: string; is_active: boolean }
    >({
      query: ({ artworkId, is_active }) => ({
        url: `/artworks/${artworkId}/activateStatus?is_active=${is_active}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { artworkId }) => [
        { type: "Artworks", id: artworkId },
      ],
    }),

    // Metadata
    createMetadata: build.mutation<any, { model_name: string; data: any }>({
      query: ({ model_name, data }) => ({
        url: `/metadata/${model_name}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Metadata"],
    }),
    listMetadata: build.query<any[], { model_name: string; search?: string }>({
      query: ({ model_name, search }) =>
        `/metadata/${model_name}/` +
        (search ? `?search=${encodeURIComponent(search)}` : ""),
      providesTags: ["Metadata"],
    }),
    getMetadata: build.query<any, { model_name: string; entry_id: string }>({
      query: ({ model_name, entry_id }) =>
        `/metadata/${model_name}/${entry_id}`,
      providesTags: (result, error, { entry_id }) => [
        { type: "Metadata", id: entry_id },
      ],
    }),
    updateMetadata: build.mutation<
      any,
      { model_name: string; entry_id: string; data: any }
    >({
      query: ({ model_name, entry_id, data }) => ({
        url: `/metadata/${model_name}/${entry_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { entry_id }) => [
        { type: "Metadata", id: entry_id },
      ],
    }),
    deleteMetadata: build.mutation<
      any,
      { model_name: string; entry_id: string }
    >({
      query: ({ model_name, entry_id }) => ({
        url: `/metadata/${model_name}/${entry_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Metadata"],
    }),
    getMetadataUsageCounts: build.query<any[], string>({
      query: (model_name) => `/metadata/${model_name}/usage`,
      providesTags: ["Metadata"],
    }),

    listOrders: build.query<
      any[],
      {
        status?: string;
        start_date?: string;
        end_date?: string;
        buyer_id?: string;
        artist_id?: string;
        search?: string;
        skip?: number;
        limit?: number;
      }
    >({
      query: ({
        status,
        start_date,
        end_date,
        buyer_id,
        artist_id,
        search,
        skip = 0,
        limit = 20,
      }) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (buyer_id) params.append("buyer_id", buyer_id);
        if (artist_id) params.append("artist_id", artist_id);
        if (search) params.append("search", search);
        params.append("skip", skip.toString());
        params.append("limit", limit.toString());
        return `/orders?${params.toString()}`;
      },
      providesTags: ["Orders"],
    }),
    getOrderSummary: build.query<any, void>({
      query: () => "/orders/summary",
      providesTags: ["Orders"],
    }),

    getAdminAnalytics: build.query<any, void>({
      query: () => "/admin/analytics",
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useListUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeactivateUserMutation,

  useListArtistsQuery,
  useGetArtistQuery,
  useVerifyArtistMutation,
  useDeactivateArtistMutation,

  useListArtworksQuery,
  useGetArtworkQuery,
  useToggleFeatureArtworkMutation,
  useToggleActivateArtworkMutation,

  useCreateMetadataMutation,
  useListMetadataQuery,
  useGetMetadataQuery,
  useUpdateMetadataMutation,
  useDeleteMetadataMutation,
  useGetMetadataUsageCountsQuery,

  useListOrdersQuery,
  useGetOrderSummaryQuery,

  useGetAdminAnalyticsQuery,
} = adminApi;
