"use client";
import {
  Box,
  Card,
  CardSection,
  Container,
  Group,
  Image,
  LoadingOverlay,
  Tabs,
  TabsList,
  TabsTab,
  Text,
} from "@mantine/core";
import React from "react";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import { useGetPublicArtworksQuery } from "@/store/api/artwork/artwork";
import CartDrawer from "../../_component/CartDrawer";
import AddtoCart from "../../_component/AddtoCart";
import AddtoWishlist from "../../_component/AddtoWishlist";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Discover = ({ title }: { title: string }) => {
  const router = useRouter();
  const { data: artworks, isLoading } = useGetPublicArtworksQuery({
    skip: 0,
    limit: 12,
  });
  const t = useTranslations("common.Landing");
  return (
    <Container size="xl" className="p-16 mx-auto flex flex-col gap-6">
      <p className="text-2xl font-semibold text-center pb-6">{title}</p>
      <Box className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 px-10">
        {isLoading && <p>loading....</p>}
        {artworks?.artworks?.map((item: any) => (
          <Link href={`/art-page/${item.id}`} passHref key={item.id}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              className="bg-red-900 w-full max-w-sm mx-auto"
            >
              <CardSection>
                <Image
                  alt="Product image"
                  src={item?.images[0]?.url}
                  className="w-full h-64 object-cover" // Increased image height
                />
              </CardSection>

              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p
                    className="text-sm font-semibold cursor-pointer hover:underline"
                    onClick={() => router.push(`/art-page/${item.id}`)}
                  >
                    {item?.title}
                  </p>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <AddtoWishlist id={item?.id} />
                    <AddtoCart id={item?.id} />
                  </div>
                </div>

                <Text c="dimmed" className="text-xs font-semibold">
                  {item?.artist?.first_name} {item?.artist?.last_name}
                </Text>

                <Text className="text-xs font-semibold">{item?.price}</Text>
              </div>
            </Card>
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default Discover;
