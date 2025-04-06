import {
  Card,
  CardSection,
  Container,
  Grid,
  Group,
  Image,
  Tabs,
  TabsList,
  TabsTab,
} from "@mantine/core";
import React from "react";
import { IconHeart } from "@tabler/icons-react";
const Discover = () => {
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
      title: "Les Demoiselles d'Avignon",
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
      title: "The Persistence of Memory",
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
  ];
  return (
    <Container className="py-20 mx-auto">
      <p className="text-2xl font-semibold text-center">Discover Artworks</p>

      <Tabs defaultValue="first" className="py-4">
        <TabsList grow>
          <TabsTab value="first">Best Seller</TabsTab>
          <TabsTab value="second">Recently Viewed</TabsTab>
          <TabsTab value="third">New works</TabsTab>
        </TabsList>
      </Tabs>

      <Grid className="grid-cols-3 gap-10">
        {mockArtworks.map((item) => (
          <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
            <CardSection>
              <Image alt="Product image" src={item?.src} />
            </CardSection>
            <Group>
              <p>{item?.title}</p>
              <IconHeart />
            </Group>
            <p>{item?.artistName}</p>
            <p>{item?.price}</p>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Discover;
