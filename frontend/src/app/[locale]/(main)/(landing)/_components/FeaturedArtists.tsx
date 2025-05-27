"use client";
import { useGetPublicArtworksQuery } from "@/store/api/artwork/artwork";

const FeaturedArtists = () => {
  const { data } = useGetPublicArtworksQuery({});
  const artworks = data?.artworks || [];

  // Duplicate for smooth looping
  const loopedArtworks = [...artworks, ...artworks];

  return (
    <div className="overflow-hidden py-10 ">
      <h2 className="text-2xl font-semibold px-8 mb-4 text-black ">
        Featured Artworks
      </h2>

      <div className="relative overflow-hidden w-full">
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            animation: "scroll-marquee 30s linear infinite",
          }}
        >
          {loopedArtworks.map((item: any, index: number) => (
            <div
              key={index}
              className="w-[230px] h-[280px] flex-shrink-0 rounded-md overflow-hidden shadow-md"
            >
              <img
                src={item?.images?.[0]?.url || "/images/placeholder.jpg"}
                alt={`Artwork ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inline style block for custom animation */}
      <style jsx>{`
        @keyframes scroll-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedArtists;
