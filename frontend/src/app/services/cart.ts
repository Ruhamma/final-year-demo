import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface AddToCartRequest {
  artwork_id: string;
}

interface UpdateCartRequest {
  artwork_id: string;
}

interface CartResponse {
  cartItems: CartItem[];
  totalAmount: number;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
    credentials: "include", 
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart/",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (newItem) => ({
        url: "/cart/items/",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<CartResponse, UpdateCartRequest>({
      query: (updatedItem) => ({
        url: `/cart/update/${updatedItem.artwork_id}`,
        method: "PUT",
        body: updatedItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<CartResponse, { artwork_id: string }>({
      query: ({ artwork_id }) => ({
        url: `/cart/remove/${artwork_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "/cart/",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;

export const useCart = () => {
  const { data: cart, isLoading } = useGetCartQuery();

  return {
    cart,
    isLoading,
    totalAmount: cart?.totalAmount ?? 0,
    cartItems: cart?.cartItems ?? [],
    isEmpty: cart?.cartItems.length === 0,
  };
};
