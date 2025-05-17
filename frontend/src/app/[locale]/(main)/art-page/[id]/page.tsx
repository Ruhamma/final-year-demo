"use client";
import { Carousel, CarouselSlide } from "@mantine/carousel";
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
  LoadingOverlay,
  NumberFormatter,
  Stack,
} from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import React from "react";
import Discover from "../../(landing)/_components/Discover";
import Testimonials from "../../(landing)/_components/Testimonials";
import { useParams, useRouter } from "next/navigation";
import { useGetArtworkByIdQuery } from "@/store/api/artwork/artwork";
import { useAddToCartMutation } from "@/app/services/cart";
import { notify } from "@/shared/components/notification/notification";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetArtworkByIdQuery(id);
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({ artwork_id: id as string }).unwrap();
      notify("Success", "Added to cart");
    } catch (error) {
      notify("Error", "Failed to add to cart");
      console.log(error);
    }
  };
  const handlePurchaseOrder = async () => {
    try {
      await addToCart({ artwork_id: id as string }).unwrap();
      notify("Success", "Added to cart");
    } catch (error) {
      notify("Error", "Failed to add to cart");
      console.log(error);
    }
    router.push(`/detail-checkout/${id}`);
  };
  const items = [
    { title: "Art page", href: "/artworks" },
    { title: `${data?.title}`, href: "#" },
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
      <LoadingOverlay visible={isLoading} />
      <Flex className="gap-10" align={"center"} justify="center">
        <Box className="w-1/2">
          <Breadcrumbs className="pb-4">{items}</Breadcrumbs>
          <Carousel withIndicators dragFree slideGap="md" align="start" h={500}>
            {data?.images.map((image, index) => (
              <CarouselSlide key={index}>
                <Image
                  src={image.url}
                  alt="Artwork preview"
                  className="rounded-md"
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Box>
        <Box className="w-1/3 ">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-3xl">{data?.title}</p>
            <p className="text-sm font-light">{data?.medium?.name} paintings</p>
            <p className="text-sm font-light">
              {data?.size?.width} x {data?.size?.height} {data?.size?.unit}
            </p>
            <p className="text-lg font-bold">
              <NumberFormatter
                value={data?.price}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                prefix={"ETB "}
              />
            </p>
            <p className="text-sm font-light">{data?.description}</p>
          </Flex>
          <Stack>
            <Button onClick={handleAddToCart}>Add to cart</Button>
            <Button onClick={handlePurchaseOrder} variant="outline">
              Purchase Order
            </Button>
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
            <p className="text-xs">{data?.description}</p>
          </Stack>
          <Stack>
            <p className="text-lg font-bold italic">Details</p>
            <Flex gap="md" className="text-xs">
              <p>
                <strong>Category:</strong>
                {data?.category?.name}
              </p>
              <p>
                <strong>Size:</strong> {data?.size?.width} x{" "}
                {data?.size?.height} {data?.size?.unit}
              </p>
              <p>
                <strong>Style:</strong> {data?.style?.name}
              </p>
              <p>
                <strong>Medium:</strong> {data?.medium?.name}
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
              <p className="font-semibold text-sm">
                {data?.artist?.user?.username}
              </p>
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
            <p className="text-xs">{data?.artist?.bio}</p>
          </Stack>
        </Flex>
      </Container>
      <Discover title="Other works by Bilen" />
      <Testimonials title="Related Works" />
    </Box>
  );
};

export default Page;
