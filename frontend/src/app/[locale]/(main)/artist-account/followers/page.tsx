"use client";
import React from "react";
import {
  useGetArtistProfileQuery,
  useGetArtistsByIdQuery,
  useGetArtistsFollowersQuery,
} from "@/store/api/artist/profile";
import { useAuth } from "@/context/useAuth";
import { skipToken } from "@reduxjs/toolkit/query";

function page() {
  const { data: profileData } = useGetArtistProfileQuery({});

  console.log("profiledata", profileData);
  const { user } = useAuth();
  const artistId = profileData?.id;
  console.log("Artisttt", artistId);
  const { data } = useGetArtistsFollowersQuery(artistId);

  console.log("followers data", data);

  const followerId = data?.user_id;
  console.log("follower id", followerId

  )

  return <div>Followers list</div>;
}

export default page;
