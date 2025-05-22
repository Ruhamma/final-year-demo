import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Notification = {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};
export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getNotification: builder.query<Notification, void>({
      query: () => "notifications/",
    }),
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `notifications/${notificationId}/read`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetNotificationQuery, useMarkNotificationAsReadMutation } = notificationApi;
