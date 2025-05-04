'use client';
import {
  Box,
  Card,
  CardSection,
  Divider,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import React from "react";
import { useAuth } from "@/context/useAuth";
import { formatDate } from "@/shared/utils/formatDate";

const Page = () => {
  const { user } = useAuth();
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
    <div>
      <Stack gap={10}>
        <p className="text-xl font-bold">Hello{' '}
          {user?.username}!
      </p>
      <Text c="dimmed" size="xs">
        Joined {formatDate(user?.created_at || '')}
      </Text>
      <Divider />
      <p className="text-lg my-4">All Artworks</p>
    </Stack><Box className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mockArtworks.map((item) => (
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
        ))}
      </Box>
    </div>
  );
};

export default Page;
