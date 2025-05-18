import { Carousel, CarouselSlide } from "@mantine/carousel";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Stack,
} from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import React from "react";
import Discover from "../../(landing)/_components/Discover";
import Testimonials from "../../(landing)/_components/Testimonials";

const artworks = [
  {
    id: 1,
    artistName: "Vincent van Gogh",
    title: "Starry Night",
    price: "$1,000,000",
    src: "/images/Product Image (2).png",
    description:
      "This captivating painting depicts a starry sky over a quiet town. The swirling patterns convey deep emotion and movement.",
  },
  {
    id: 2,
    artistName: "Leonardo da Vinci",
    title: "Mona Lisa",
    price: "$850,000",
    src: "/images/Product Image (3).png",
    description:
      "An iconic portrait of a woman with a mysterious smile, painted by the legendary da Vinci.",
  },
];
export default function ArtDetailPage({ params }: { params: { id: string } }) {
  const artwork = artworks.find((a) => a.id === parseInt(params.id));
  if (!artwork) return notFound();

  const breadcrumbs = [
    { title: "Art page", href: "#" },
    { title: artwork.title, href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const groceries = [
    {
      value: "Shipping information",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      value: "Ratings and reviews",
      description:
        "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
    },
  ];

  const groccery = groceries.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionControl>{item.value}</AccordionControl>
      <AccordionPanel className="text-xs">{item.description}</AccordionPanel>
    </AccordionItem>
  ));
  return (
    <Box className="m-20 ">
      <Flex className="gap-10" align={"center"} justify="center">
        <Box className="w-1/2">
          <Breadcrumbs className="pb-4">{breadcrumbs}</Breadcrumbs>
          <Carousel withIndicators dragFree slideGap="md" align="start" h={500}>
            <CarouselSlide>
              <Image src={artwork.src} alt={artwork.title} />
            </CarouselSlide>
            <CarouselSlide>
              <Image src={artwork.src} alt={artwork.title} />
            </CarouselSlide>
            <CarouselSlide>
              <Image src={artwork.src} alt={artwork.title} />
            </CarouselSlide>
          </Carousel>
        </Box>
        <Box className="w-1/3 ">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-3xl">{artwork.title}</p>
            <p className="text-sm font-light">By {artwork.artistName}</p>
            <p className="text-lg font-bold">{artwork.price}</p>
            <p className="text-sm font-light">{artwork.description}</p>
          </Flex>
          <Stack>
            <Button>Add to cart</Button>
            <Button variant="outline">Purchase Order</Button>
          </Stack>
          <Box>
            <Accordion>{groccery}</Accordion>
          </Box>
        </Box>
      </Flex>
      <Flex
        className="gap-10 my-10 mt-20 mx-32"
        align={"center"}
        justify="start"
      >
        <Box className="w-1/2">
          <Stack gap="md" mb="lg">
            <p className="text-lg font-bold italic">About Artworks</p>
            <p className="text-xs">
              This captivating painting depicts a scene of the Grand Canal in
              Venice, Italy. Gondolas filled with tourists navigate the calm
              waters, gliding past majestic buildings that line the canal. The
              soft light bathes the scene in a warm glow, creating a romantic
              and inviting atmosphere. This piece is sure to add a touch of
              Venetian charm to any home.
            </p>
          </Stack>
          <Stack>
            <p className="text-lg font-bold italic">Details</p>
            <Flex gap="md" className="text-xs">
              <p>
                <strong>Materials:</strong> Lithograph on paper
              </p>
              <p>
                <strong>Size:</strong> 150 x 120cm
              </p>
              <p>
                <strong>Rarity:</strong> Limited edition
              </p>
              <p>
                <strong>Condition:</strong> Excellent condition
              </p>
              <p>
                <strong>Certificate of authenticity:</strong> Included (issued
                by gallery)
              </p>
            </Flex>
          </Stack>
        </Box>
      </Flex>

      <Container>
        <Flex className="my-14 shadow-md p-10 rounded-md" gap="xl">
          <Flex gap="md" align={"center"}>
            <Avatar
              className="text-xl text-white rounded-full"
              src="/images/Rectangle 20.png"
              size="xl"
            />
            <Stack gap="sm" mb="lg" align="center" justify="center">
              <p className="font-semibold text-sm">Bilen Assefa</p>
              <div className="flex justify-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <Button>View Profile</Button>
            </Stack>
          </Flex>
          <Divider my="lg" labelPosition="center" orientation="vertical" />
          <Stack gap="md" mb="lg">
            <p className="text-sm font-bold italic">About </p>
            <p className="text-xs">
              Bilen Assefa is a talented artist known for her stunning
              contemporary paintings. Her work often explores themes of nature,
              identity, and the human experience. With a unique style that
              blends vibrant colors and intricate details, Bilen art captivates
              viewers
            </p>
          </Stack>
        </Flex>
      </Container>
      <Discover title="Other works by Bilen" />
      <Testimonials title="Related Works" />
    </Box>
  );
}
