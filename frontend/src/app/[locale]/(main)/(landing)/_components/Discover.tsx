import {
  Box,
  Card,
  CardSection,
  Container,
  Group,
  Image,
  Tabs,
  TabsList,
  TabsTab,
  Text,
} from "@mantine/core";
import React from "react";
import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";

const Discover = ({ title }: { title: string }) => {
  const mockArtworks = [
    {
      id: 1,
      artistName: "Vincent van Gogh",
      title: "Starry Night",
      price: "$1,000,000",
      src: "/images/Product Image (2).png",
    },
    {
      id: 2,
      artistName: "Leonardo da Vinci",
      title: "Mona Lisa",
      price: "$850,000",
      src: "/images/Product Image (3).png",
    },
    {
      id: 3,
      artistName: "Pablo Picasso",
      title: "Les Demoiselles ",
      price: "$750,000",
      src: "/images/Product Image (4).png",
    },
    {
      id: 4,
      artistName: "Claude Monet",
      title: "Water Lilies",
      price: "$500,000",
      src: "/images/Product Image (5).png",
    },
    {
      id: 5,
      artistName: "Salvador Dalí",
      title: "The Persistence",
      price: "$600,000",
      src: "/images/Product Image (6).png",
    },
    {
      id: 6,
      artistName: "Edvard Munch",
      title: "The Scream",
      price: "$700,000",
      src: "/images/Product Image.png",
    },
    {
      id: 7,
      artistName: "Vincent van Gogh",
      title: "Starry Night",
      price: "$1,000,000",
      src: "/images/Product Image (2).png",
    },
    {
      id: 8,
      artistName: "Leonardo da Vinci",
      title: "Mona Lisa",
      price: "$850,000",
      src: "/images/Product Image (3).png",
    },
  ];
  return (
    <Container className="py-24 mx-auto">
      <p className="text-2xl font-semibold text-center">{title}</p>

      <Tabs defaultValue="first" className="py-6">
        <TabsList grow>
          <TabsTab value="first">Best Seller</TabsTab>
          <TabsTab value="second">Recently Viewed</TabsTab>
          <TabsTab value="third">New works</TabsTab>
        </TabsList>
      </Tabs>

      <Box className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mockArtworks.map((item) => (
          <Link key={item.id} href={`/art-page/${item.id}`}>
            <Card
              key={item.id}
              shadow="sm"
              radius="md"
              withBorder
              className="bg-red-900"
            >
              <CardSection>
                <Image alt="Product image" src={item?.src} />
              </CardSection>
              <Group className="py-2" justify="space-between" align="center">
                <p className="text-sm font-semibold">{item?.title}</p>
                <IconHeart />
              </Group>
              <Text c="dimmed" className="text-xs font-semibold" size="xs">
                {item?.artistName}
              </Text>
              <Text className="text-xs font-semibold" size="xs">
                {item?.price}
              </Text>
            </Card>
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default Discover;
