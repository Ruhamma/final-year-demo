import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number;
  email: string;
  username: string;
  role: {
    id: number;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;

}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role: string;
}

interface AuthResponse {
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || 'http://localhost:8000/api',
    credentials: 'include', // Important for cookies
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/users/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/users/register/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<User | null, void>({
      query: () => "/users/me/",
      providesTags: ["Auth"],
      // Handle unauthorized errors gracefully
      transformErrorResponse: () => null,
    }),
    refreshToken: builder.mutation<void, void>({
      query: () => ({
        url: "/users/token/refresh/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
} = authApi;

export const useAuth = () => {
  const { data: user, isLoading } = useGetMeQuery();

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role.name === "ADMIN",
    isSeller: user?.role.name === "SELLER",
    isBuyer: user?.role.name === "BUYER",
    hasRole: (role: string) => user?.role.name === role,
  };
};
