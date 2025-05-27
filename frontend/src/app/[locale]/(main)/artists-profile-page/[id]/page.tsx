"use client";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import {
  useGetArtistsByIdQuery,
  useGetArtistsFollowersQuery,
  useGetArtistsRatingsQuery,
} from "@/store/api/artist/profile";
import {
  useGetArtworksByArtistIdQuery,
  useGetMetadataQuery,
  useGetRatingsQuery,
} from "@/store/api/artwork/artwork";
import {
  useFollowArtistMutation,
  useUnfollowArtistMutation,
} from "@/store/api/artist/profile";
import { usePathname } from "next/navigation";
import { Group, Rating, Select, TextInput, Button } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { useAuth } from "@/context/useAuth";

// Utility components
function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`bg-none p-4 ${className}`}>{children}</div>;
}

function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

// Main Component
export default function ArtistProfile() {
  const { user } = useAuth();
  console.log("user", user);
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const limit = 12;
  const skip = (page - 1) * limit;
  const artistId = pathname ? pathname.split("/").pop() : "";
  const { data: metadata } = useGetMetadataQuery({});
  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 300);
  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    medium: "",
    style: "",
    category: "",
  });
  const [
    followArtist,
    {
      isLoading: isFollowLoading,
      isSuccess: isFollowSuccess,
      isError: isFollowError,
    },
  ] = useFollowArtistMutation();

  const [
    unfollowArtist,
    {
      isLoading: isUnfollowLoading,
      isSuccess: isUnfollowSuccess,
      isError: isUnfollowError,
    },
  ] = useUnfollowArtistMutation();

  const [isFollowing, setIsFollowing] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetArtistsFollowersQuery(artistId as string);
  const [followersCount, setFollowersCount] = useState(0);

  const { data: artistRatings } = useGetArtistsRatingsQuery(artistId as string);
  console.log("artistRATE", artistRatings);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFollowersCount(data.length);
    }
  }, [data]);

  // if (isLoading) return <p>Loading followers...</p>;
  // if (isError) return <p>Failed to load followers.</p>;

  console.log("follolwers", data);

  // useEffect(() => {
  //   const checkFollowStatus = async () => {
  //     try {
  //       const response = await fetch(`/api/artwork/${artistId}/is-following`);
  //       const data = await response.json();
  //       setIsFollowing(data.isFollowing);
  //     } catch (error) {
  //       console.error("Error checking follow status:", error);
  //     }
  //   };

  //   checkFollowStatus();
  // }, [artistId]);

  const handleFollow = async () => {
    try {
      await followArtist(artistId as string).unwrap();
      console.log("You are now following the artist!");
    } catch (err) {
      console.error("Failed to follow artist:", err);
    }
  };

  const { data: artistData, isLoading: isArtistLoading } =
    useGetArtistsByIdQuery(artistId || "");

  const { data: ratingsData, isLoading: isRatesLoading } = useGetRatingsQuery(
    artistId || ""
  );

  console.log("Ratings Data", ratingsData);

  useEffect(() => {
    console.log("Filters changed:", {
      search: debounced,
      ...selectedFilters,
    });
  }, [debounced, selectedFilters]);
  const { data: artworksData, isLoading: isArtworksLoading } =
    useGetArtworksByArtistIdQuery({
      artistId,
      skip,
      limit,
      search: debounced,
      price: selectedFilters.price,
      category: selectedFilters.category,
      medium: selectedFilters.medium,
      style: selectedFilters.style,
    });

  console.log("artwork of the artist", artworksData);

  const artist = artistData || {};
  const artworks = artworksData?.artworks || [];
  const total = artworksData?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleClear = () => {
    setSelectedFilters({ price: "", medium: "", style: "", category: "" });
    setSearch("");
  };

  return (
    <div className="bg-cream min-h-screen text-gray-800 bg-[#FFFCEA]">
      <div
        className="relative w-full h-[300px] bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${artist.thumbnail})` }}
      ></div>

      <div className="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-10">
        {/* Left Column - Artist Info */}
        <div className="md:col-span-1 flex flex-col items-center text-center mt-[-150px] z-10">
          <div className="relative">
            <Image
              src={artist.profile_picture || "/images/placeholder.jpg"}
              alt={artist.first_name || "Artist"}
              width={200}
              height={200}
              className="rounded-full h-[170px] w-[170px] object-cover"
            />
            {artist.is_verified && (
              <div className="absolute top-[5%] right-1 bg-green-500 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{artist.first_name}</h2>
          <div className="text-yellow-500 flex items-center">
            <Rating value={artist.rating || 0} fractions={2} readOnly />
            <span className="ml-2 text-gray-600 text-sm">
              ({artist.rating || 0})
            </span>
          </div>
          <div>Followers:{followersCount}</div>
          <div>
            <button
              onClick={async () => {
                try {
                  if (isFollowing) {
                    await unfollowArtist(artistId as string).unwrap();
                    setIsFollowing(false);
                    setFollowersCount((prev) => Math.max(prev - 1, 0));
                  } else {
                    await followArtist(artistId as string).unwrap();
                    setIsFollowing(true);
                    setFollowersCount((prev) => prev + 1);
                  }
                } catch (err) {
                  console.error("Follow/Unfollow error:", err);
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isFollowLoading || isUnfollowLoading}
            >
              {isFollowLoading || isUnfollowLoading
                ? "Processing..."
                : isFollowing
                ? "Unfollow"
                : "Follow"}
            </button>
          </div>

          <p className="mt-2 text-sm text-gray-600">Joined May 2016</p>
          <p className="mt-4 text-sm">{artist.bio}</p>
        </div>

        {/* Right Column - Filters + Artworks */}
        <div className="md:col-span-3">
          {/* Filters */}
          <div className="bg-[#fefae0] p-6 mb-6">
            <div className="flex flex-col gap-4 mt-4 md:flex-row md:items-center md:justify-between">
              <Group gap="xs" className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  leftSection={<IconFilter size={16} />}
                >
                  All Filters
                </Button>

                <Select
                  placeholder="Price"
                  data={["Low to High", "High to Low"]}
                  value={selectedFilters.price}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      price: val || "",
                    }))
                  }
                  className="w-32"
                />
                <Select
                  placeholder="Categories"
                  data={metadata?.categories?.map((cat: any) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  value={selectedFilters.category}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      category: val || "",
                    }))
                  }
                  className="w-32"
                />
                <Select
                  placeholder="Medium"
                  data={metadata?.media?.map((medium: any) => ({
                    value: medium.id,
                    label: medium.name,
                  }))}
                  value={selectedFilters.medium}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      medium: val || "",
                    }))
                  }
                  className="w-32"
                />
                <Select
                  placeholder="Style"
                  data={metadata?.styles?.map((style: any) => ({
                    value: style.id,
                    label: style.name,
                  }))}
                  value={selectedFilters.style}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      style: val || "",
                    }))
                  }
                  className="w-32"
                />

                <Button variant="subtle" onClick={handleClear}>
                  Clear all
                </Button>
              </Group>

              <Group gap="xs">
                <TextInput
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  placeholder="Search"
                  leftSection={<IconSearch size={16} />}
                  classNames={{
                    input:
                      "bg-transparent border-b border-gray-400 rounded-none focus:border-black focus:ring-0",
                  }}
                  className="w-full"
                />
              </Group>
            </div>
          </div>

          {/* Artworks Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {artworks.map((art: any, idx: number) => (
              <Card key={idx} className="relative">
                <CardContent>
                  <Image
                    src={art.images?.[0]?.url || "/images/placeholder.png"}
                    alt={art.title}
                    width={300}
                    height={300}
                    className="h-[300px] w-full object-cover"
                  />
                  <div className="relative flex flex-col mt-2">
                    <h3 className="font-semibold italic">{art.title}</h3>
                    <p className="text-sm">
                      {art.artist?.first_name} {art.artist?.last_name}
                    </p>
                    <p className="text-sm italic">
                      {art.size?.width} x {art.size?.height} {art.size?.unit}
                    </p>
                    <p className="text-sm font-medium text-black">
                      ETB {art.price}
                    </p>
                    <div className="text-yellow-500 flex items-center">
                      <Rating
                        value={art.average_rating || 0}
                        fractions={2}
                        readOnly
                      />
                      <span className="ml-2 text-gray-600 text-sm">
                        ({art.average_rating || 0})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`w-8 h-8 rounded-full border ${
                  page === pg ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {pg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
