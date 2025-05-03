import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface AddToCartRequest {
  productId: number;
  quantity: number;
}

interface UpdateCartRequest {
  productId: number;
  quantity: number;
}

interface CartResponse {
  cartItems: CartItem[];
  totalAmount: number;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
    credentials: "include", // Important for cookies
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart/",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (newItem) => ({
        url: "/cart/add/",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<CartResponse, UpdateCartRequest>({
      query: (updatedItem) => ({
        url: `/cart/update/${updatedItem.productId}`,
        method: "PUT",
        body: updatedItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<CartResponse, { productId: number }>({
      query: ({ productId }) => ({
        url: `/cart/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "/cart/clear/",
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
