import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number;
  email: string;
  username: string;
  role: {
    id: number;
    name: string;
    permissions: string;
  };
  created_at?: string;
  updated_at?: string;
  profile_picture?: string;
  first_name?: string;
  last_name?: string;
  is_active?: string;
  phone_number?: string;
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
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
    credentials: "include",
  }),
  tagTypes: ["Auth", "profile"],
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
        url: "/user/register/",
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
      providesTags: ["Auth", "profile"],
      transformErrorResponse: () => null,
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: `user/me/`,
        method: "PUT",
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
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: `/user/verify-email/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendCode: builder.mutation({
      query: (body) => ({
        url: `/user/resend-verification-code/`,
        method: "POST",
        body: body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `/user/forgot-password/`,
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/user/reset-password/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyCode: builder.mutation({
      query: (body) => ({
        url: `/user/verify-code/`,
        method: "POST",
        body,
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
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendCodeMutation,
  useVerifyCodeMutation,
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
