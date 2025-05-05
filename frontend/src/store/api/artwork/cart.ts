import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || 'http://localhost:8000/api',
    credentials: 'include',
  }),
  tagTypes: ['cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'cart/',
      providesTags: ['cart'],
    }),
    addCartItem: builder.mutation({
      query: (item) => ({
        url: 'cart/items/',
        method: 'POST',
        body: item, 
      }),
      invalidatesTags: ['cart'],
    }),
    removeCartItem: builder.mutation({
      query: (itemId) => ({
        url: `cart/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cart'],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart/',
        method: 'DELETE',
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
