// components/RecommendedArtworks.tsx
'use client';

import { useGetRecommendationQuery } from '@/store/api/artwork/artwork'; 
import Link from 'next/link';

interface RecommendedArtworksProps {
  artworkId: string;
}

interface Artwork {
  id: string;
  title: string;
  year: number;
  artistName: string;
}

export const RecommendedArtworks = ({ artworkId }: RecommendedArtworksProps) => {
  const { data: recommendations, isLoading, error } = useGetRecommendationQuery({ artworkId });
  console.log("reco", recommendations)
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Related Artworks</h2>
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-red-600">Failed to load recommendations</p>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="rounded-md bg-blue-50 p-4">
        <p className="text-blue-600">No recommendations available</p>
      </div>
    );
  }


  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Related Artworks</h2>
      
      <div className="space-y-4">
        {recommendations.map(
          <Link 
            key={recommendations.id} 
            href={`/artworks/${recommendations.id}`}
            className="block group hover:bg-gray-50 p-2 rounded transition-colors"
          >
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
              {recommendations.title}, {recommendations.year}
            </h3>
            <p className="text-gray-600">{recommendations.artistName}</p>
          </Link>
        )}
      </div>
    </section>
  );
};