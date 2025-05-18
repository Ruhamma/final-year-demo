'use client'
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
const Discover = ({ title }: { title: string }) => {
  const {data: artworks, isLoading} = useGetPublicArtworksQuery({
    skip:0,
    limit:12
  })
const t = useTranslations('common.Landing');
  return (
    <Container className="py-24 mx-auto">
      <p className="text-2xl font-semibold text-center">{title}</p>

      <Tabs defaultValue="first" className="py-6">
        <TabsList grow>
          <TabsTab value="first">{t('BestSellers')}</TabsTab>
          <TabsTab value="second">{t('RecentlyViewed')}</TabsTab>
          <TabsTab value="third">{t('NewWorks')}</TabsTab>
        </TabsList>
      </Tabs>

      <Box className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <LoadingOverlay visible={isLoading} />
        {artworks?.artworks?.map((item:any) => (
          <Card
            key={item.id}
            shadow="sm"
            radius="md"
            withBorder
            className="bg-red-900"
          >
            <CardSection>
              <Image alt="Product image" src={item?.images[0]?.url} />
            </CardSection>
            <Group className="py-2" justify="space-between" align="center">
              <p className="text-sm font-semibold">{item?.title}</p>
               <Group>
                <AddtoWishlist id={item?.id} />
                <AddtoCart id={item?.id} />
               </Group>
            </Group>
            <Text c="dimmed" className="text-xs font-semibold" size="xs">
              {/* {item?.artistName} */}
            </Text>
            <Text className="text-xs font-semibold" size="xs">
              {item?.price}
            </Text>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Discover;