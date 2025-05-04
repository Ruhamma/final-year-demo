import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  productId: number;
}

interface WishlistResponse {
  wishlistItems: WishlistItem[];
}

interface AddToWishlistRequest {
  productId: number;
}

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistResponse, void>({
      query: () => "/wishlist/",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<WishlistResponse, AddToWishlistRequest>({
      query: (product) => ({
        url: "/wishlist/add/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<WishlistResponse, { productId: number }>({
      query: ({ productId }) => ({
        url: `/wishlist/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    clearWishlist: builder.mutation<void, void>({
      query: () => ({
        url: "/wishlist/clear/",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistApi;

export const useWishlist = () => {
  const { data: wishlist, isLoading } = useGetWishlistQuery();

  return {
    wishlist,
    wishlistItems: wishlist?.wishlistItems ?? [],
    isLoading,
    isEmpty: wishlist?.wishlistItems.length === 0,
  };
};
