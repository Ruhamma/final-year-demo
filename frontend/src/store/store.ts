import { authApi } from "@/app/services/auth";
import { configureStore } from "@reduxjs/toolkit";
import { artistProfileApi } from "@/store/api/artist/profile";
import { artworkApi } from "@/store/api/artwork/artwork";
import { cartApi } from "@/store/api/artwork/cart";
import { orderApi } from "./api/order/order";
import { adminApi } from "@/store/api/admin/admin";
import { notificationApi } from "@/store/api/notification/notificationApi";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [artistProfileApi.reducerPath]: artistProfileApi.reducer,
    [artworkApi.reducerPath]: artworkApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      artistProfileApi.middleware,
      artworkApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      adminApi.middleware,
      notificationApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
