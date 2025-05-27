"use client";
import { useGetPublicArtworksQuery } from "@/store/api/artwork/artwork";
import { LoadingOverlay } from "@mantine/core";
import VirtualGallery from "./_components/VirtualGallery";

const VirtualGalleryPage = () => {
  const { data: artworksData, isLoading } = useGetPublicArtworksQuery({
    skip: 1,
    limit: 10,
  });

  if (isLoading || !artworksData) {
    return <LoadingOverlay visible />;
  }

  return (
    <div className="w-full h-screen">
      <VirtualGallery artworks={artworksData.artworks} />
    </div>
  );
};

export default VirtualGalleryPage;
