import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api/admin",
    credentials: "include",
  }),
  tagTypes: ["Users", "Artists", "Artworks", "Metadata", "Orders", "Analytics"],
  endpoints: (build) => ({
    listUsers: build.query<any, any>({
      query: (params) => ({
        url: `/admin/users/`,
        params,
      }),
      providesTags: ["Users"],
    }),
    getUser: build.query<any, string>({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    updateUser: build.mutation<any, { userId: string; updates: any }>({
      query: ({ userId, updates }) => ({
        url: `/admin/users/${userId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Users", id: userId },
      ],
    }),
    deactivateUser: build.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
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
        search?: string;
      }
    >({
      query: ({ is_verified, is_active, limit = 10, offset = 0, search }) => {
        const params = new URLSearchParams();
        if (is_verified !== undefined)
          params.append("is_verified", String(is_verified));
        if (is_active !== undefined)
          params.append("is_active", String(is_active));
        params.append("limit", String(limit));
        params.append("offset", String(offset));
        if (search) params.append("search", search);
        return `/admin/artists/?${params.toString()}`;
      },
      providesTags: ["Artists"],
    }),

    getArtist: build.query<any, string>({
      query: (artistId) => `/admin/artists/${artistId}`,
      providesTags: ["Artists"],
    }),

    verifyArtist: build.mutation<any, string>({
      query: (artistId) => ({
        url: `/admin/artists/${artistId}/verify`,
        method: "PUT",
      }),
      invalidatesTags: ["Artists"],
    }),

    deactivateArtist: build.mutation<any, string>({
      query: (artistId) => ({
        url: `/admin/artists/${artistId}/deactivate`,
        method: "PUT",
      }),
      invalidatesTags: ["Artists"],
    }),

    // Artworks
    listArtworks: build.query<any, any>({
      query: (params) => ({
        url: `/admin/artworks`,
        params,
      }),
      providesTags: ["Artworks"],
    }),

    getArtwork: build.query<any, string>({
      query: (artworkId) => `/admin/artworks/${artworkId}`,
      providesTags: ["Artworks"],
    }),

    toggleFeatureArtwork: build.mutation<
      any,
      { artworkId: string; feature: boolean }
    >({
      query: ({ artworkId, feature }) => ({
        url: `/admin/artworks/${artworkId}/feature?feature=${feature}`,
        method: "PUT",
      }),
      invalidatesTags: ["Artworks"],
    }),
    toggleActivateArtwork: build.mutation<
      any,
      { artworkId: string; is_active: boolean }
    >({
      query: ({ artworkId, is_active }) => ({
        url: `/admin/artworks/${artworkId}/activateStatus?is_active=${is_active}`,
        method: "PUT",
      }),
      invalidatesTags: ["Artworks"],
    }),

    // Metadata
    createMetadata: build.mutation<any, { model_name: string; data: any }>({
      query: ({ model_name, data }) => ({
        url: `/admin/metadata/${model_name}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Metadata"],
    }),
    listMetadata: build.query({
      query: ({ model_name, search, skip = 0, limit = 10 }) =>
        `admin/metadata/${model_name}/?skip=${skip}&limit=${limit}` +
        (search ? `&search=${encodeURIComponent(search)}` : ""),
      providesTags: ["Metadata"],
    }),
    getMetadata: build.query<any, { model_name: string; entry_id: string }>({
      query: ({ model_name, entry_id }) =>
        `/admin/metadata/${model_name}/${entry_id}`,
      providesTags: ["Metadata"],
    }),
    updateMetadata: build.mutation<
      any,
      { model_name: string; entry_id: string; data: any }
    >({
      query: ({ model_name, entry_id, data }) => ({
        url: `/admin/metadata/${model_name}/${entry_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Metadata"],
    }),
    deleteMetadata: build.mutation<
      any,
      { model_name: string; entry_id: string }
    >({
      query: ({ model_name, entry_id }) => ({
        url: `/admin/metadata/${model_name}/${entry_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Metadata"],
    }),
    getMetadataUsageCounts: build.query<any[], string>({
      query: (model_name) => `/admin/metadata/${model_name}/usage`,
      providesTags: ["Metadata"],
    }),
    getMetadataCounts: build.query({
      query: () => `/admin/metadata/counts`,
      providesTags: ["Metadata"],
    }),
    exportMetadataUsageCSV: build.mutation<Blob, string>({
      query: (model_name) => ({
        url: `/admin/metadata/${model_name}/usage/export`,
        method: "GET",
        responseHandler: (response: any) => response.blob(),
        headers: {
          Accept: "text/csv",
        },
      }),
    }),
    exportOrdersCSV: build.mutation({
      query: () => ({
        url: "/admin/orders/actions/export",
        method: "GET",
        responseHandler: (response: any) => response.blob(),
        headers: {
          Accept: "text/csv",
        },
      }),
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
        return `/admin/orders?${params.toString()}`;
      },
      providesTags: ["Orders"],
    }),
    getOrderById: build.query<any, string>({
      query: (orderId) => `/admin/orders/${orderId}`,
      providesTags: ["Orders"],
    }),
    getOrderSummary: build.query<any, void>({
      query: () => "/admin/orders/summary",
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
  useGetMetadataCountsQuery,
  useExportMetadataUsageCSVMutation,

  useListOrdersQuery,
  useGetOrderSummaryQuery,
  useGetOrderByIdQuery,
  useExportOrdersCSVMutation,

  useGetAdminAnalyticsQuery,
} = adminApi;
