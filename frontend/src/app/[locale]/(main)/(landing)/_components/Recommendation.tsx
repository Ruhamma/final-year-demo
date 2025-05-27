// components/UserRecommendations.tsx
"use client";

import { useGetUserRecommendationQuery } from "@/store/api/users/page";
import Link from "next/link";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Card, CardSection, Group, Image, Text, Skeleton } from "@mantine/core";
import { useTranslations } from "next-intl";

interface UserRecommendationsProps {
  userId: string;
}

export const UserRecommendations = ({ userId }: UserRecommendationsProps) => {
  const { data: recommendations, isLoading, error } = useGetUserRecommendationQuery({ userId });
  const t = useTranslations("common.Landing");

  if (error) {
    return (
      <Box className="rounded-md bg-red-50 p-4">
        <Text className="text-red-600">Failed to load recommendations</Text>
      </Box>
    );
  }

  if (!isLoading && (!recommendations || recommendations.length === 0)) {
    return (
      <Box className="rounded-md bg-blue-50 p-4">
        <Text className="text-blue-600">No recommendations available</Text>
      </Box>
    );
  }

  return (
    <Box className="mt-8">
      <Box className="px-4 sm:px-10 md:px-24 py-6">
        <Text className="text-lg sm:text-xl md:text-2xl font-semibold">Recommended For You</Text>
        <Text className="text-xs sm:text-sm font-light">{t('Personalized suggestions based on your preferences')}</Text>
      </Box>
      
      <Box className="px-4 sm:px-10">
        {/* Mobile Carousel (2 slides) */}
        <Carousel
          withIndicators
          slideSize="50%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={2}
          className="flex md:hidden"
        >
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <CarouselSlide key={i}>
                <Card shadow="sm" radius="md" withBorder className="h-full flex flex-col">
                  <CardSection className="flex-grow-0">
                    <Skeleton height={200} className="w-full" />
                  </CardSection>
                  <Box className="p-3 flex-grow">
                    <Group className="py-2" justify="space-between" align="center">
                      <Skeleton height={16} width="70%" />
                    </Group>
                    <Skeleton height={14} width="50%" />
                  </Box>
                </Card>
              </CarouselSlide>
            ))
          ) : (
            recommendations.map((artwork: any) => (
              <CarouselSlide key={artwork.id}>
                <Link href={`/artworks/${artwork.id}`}>
                  <Card shadow="sm" radius="md" withBorder className="h-full flex flex-col hover:shadow-md transition-shadow">
                    <CardSection className="flex-grow-0">
                      <Image 
                        alt={artwork.title} 
                        src={artwork.images[0]?.url} 
                        height={200}
                        className="w-full object-cover"
                      />
                    </CardSection>
                    <Box className="p-3 flex-grow">
                      <Group className="py-2" justify="space-between" align="center">
                        <Text className="text-sm font-semibold line-clamp-1">{artwork.title}</Text>
                      </Group>
                      <Text c="dimmed" className="text-xs font-semibold line-clamp-1" size="xs">
                        {artwork.artist.first_name} {artwork.artist.last_name}
                      </Text>
                      {artwork.price && (
                        <Text className="text-xs font-semibold mt-1">
                          ${artwork.price.toLocaleString()}
                        </Text>
                      )}
                    </Box>
                  </Card>
                </Link>
              </CarouselSlide>
            ))
          )}
        </Carousel>

        {/* Desktop Carousel (4 slides) */}
        <Carousel
          withIndicators
          slideSize="25%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={4}
          className="hidden md:flex"
        >
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <CarouselSlide key={i}>
                <Card shadow="sm" radius="md" withBorder className="h-full flex flex-col">
                  <CardSection className="flex-grow-0">
                    <Skeleton height={200} className="w-full" />
                  </CardSection>
                  <Box className="p-3 flex-grow">
                    <Group className="py-2" justify="space-between" align="center">
                      <Skeleton height={16} width="70%" />
                    </Group>
                    <Skeleton height={14} width="50%" />
                  </Box>
                </Card>
              </CarouselSlide>
            ))
          ) : (
            recommendations.map((artwork: any) => (
              <CarouselSlide key={artwork.id}>
                <Link href={`/artworks/${artwork.id}`}>
                  <Card shadow="sm" radius="md" withBorder className="h-full flex flex-col hover:shadow-md transition-shadow">
                    <CardSection className="flex-grow-0">
                      <Image 
                        alt={artwork.title} 
                        src={artwork.images[0]?.url} 
                        height={200}
                        className="w-full object-cover"
                      />
                    </CardSection>
                    <Box className="p-3 flex-grow">
                      <Group className="py-2" justify="space-between" align="center">
                        <Text className="text-sm font-semibold line-clamp-1">{artwork.title}</Text>
                      </Group>
                      <Text c="dimmed" className="text-xs font-semibold line-clamp-1" size="xs">
                        {artwork.artist.first_name} {artwork.artist.last_name}
                      </Text>
                      {artwork.price && (
                        <Text className="text-xs font-semibold mt-1">
                          ${artwork.price.toLocaleString()}
                        </Text>
                      )}
                    </Box>
                  </Card>
                </Link>
              </CarouselSlide>
            ))
          )}
        </Carousel>
      </Box>
    </Box>
  );
};