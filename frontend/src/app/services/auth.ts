import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number;
  email: string;
  username: string;
  role: {
    id: number;
    name: string;
    permissions:string;
  };
  created_at?: string;
  updated_at?: string;
  profile_picture?:string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  role: string;
}

interface AuthResponse {
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || 'http://localhost:8000/api',
    credentials: 'include', 
  }),
  tagTypes: ["Auth","profile"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/user/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<User | null, void>({
      query: () => "/user/me/",
      providesTags: ["Auth","profile"],
      transformErrorResponse: () => null,
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: `user/me/`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
    refreshToken: builder.mutation<void, void>({
      query: () => ({
        url: "/user/token/refresh/",
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
  useUpdateUserProfileMutation,

} = authApi;

export const useAuth = () => {
  const { data: user, isLoading } = useGetMeQuery();

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role?.name === "ADMIN",
    isSeller: user?.role?.name === "SELLER",
    isBuyer: user?.role?.name === "BUYER",
    hasRole: (role: string) => user?.role?.name === role,
  };
};
