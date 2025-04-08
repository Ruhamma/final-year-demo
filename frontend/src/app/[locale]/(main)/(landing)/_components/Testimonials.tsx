import React from "react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Card, CardSection, Group, Image, Text } from "@mantine/core";
const Testimonials = ({ title }: { title: string }) => {
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
      <Box className="p-10 pl-24">
        <p className="text-2xl font-semibold ">{title}</p>
        <p className="text-xs font-light">Arts by emerging artists</p>
      </Box>
      <Box className="px-10">
        <Carousel
          withIndicators
          slideSize="20%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={4}
        >
          {mockArtworks.map((item) => (
            <CarouselSlide key={item.id}>
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
                </Group>
                <Text c="dimmed" className="text-xs font-semibold" size="xs">
                  {item?.artistName}
                </Text>
              </Card>
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default Testimonials;
