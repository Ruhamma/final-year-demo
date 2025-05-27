"use client";
import React from "react";
import {
  useGetUserFollowersQuery,
  useGetuserProfileQuery,
} from "@/store/api/users/page";
import { useAuth } from "@/context/useAuth";

function page() {
  const { user } = useAuth();
  const userId = user?.id;

  const { data } = useGetUserFollowersQuery(userId);
  console.log("user data", data);
  return <div>Artists I follow</div>;
}

export default page;
