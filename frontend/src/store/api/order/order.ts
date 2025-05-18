import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["order", "payment"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (item) => ({
        url: "orders/cart-purchase/",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["order"],
    }),
    createDirectOrder: builder.mutation({
      query: (item) => ({
        url: "orders/direct-purchase/",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["order"],
    }),
    getUserOrders: builder.query({
      query: () => "orders/my-orders",
      providesTags: ["order"],
    }),
    createPayment: builder.mutation({
      query: (orderId) => ({
        url: `/payment/initialize?order_id=${orderId}`,
        method: "POST",
      }),
      invalidatesTags: ["payment"],
    }),
    getOrderById: builder.query({
      query: (orderId) => `orders/${orderId}`,
      providesTags: ["order"],
    }),
    getArtistOrders: builder.query({
      query: () => "orders/artist-orders",
      providesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateDirectOrderMutation,
  useGetUserOrdersQuery,
  useCreatePaymentMutation,
  useGetOrderByIdQuery,
  useGetArtistOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
