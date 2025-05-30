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
  Modal,
  NumberFormatter,
  Stack,
  Text,
  Rating,
  Group,
  Pagination,
} from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import React, { useMemo, useState } from "react";
import Discover from "../../(landing)/_components/Discover";
import Testimonials from "../../(landing)/_components/Testimonials";
import { useParams, useRouter } from "next/navigation";
import { useGetArtworkByIdQuery } from "@/store/api/artwork/artwork";
import { useAddToCartMutation } from "@/app/services/cart";
import { notify } from "@/shared/components/notification/notification";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { RecommendedArtworks } from "../recommendation";
import { useTranslations } from "next-intl";
import { useGetArtworkReviewsQuery } from "@/store/api/artwork/artwork";

const ARViewer = dynamic(() => import("../_components/_components/ARviewer"), {
  ssr: false,
});

const Page = () => {
  const t = useTranslations("common.Artworks");
  const { id } = useParams();
  const router = useRouter();
  const [arOpened, setArOpened] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const sessionKey = useMemo(() => {
    if (typeof window === "undefined") return "";
    let key = localStorage.getItem("session_key");
    if (!key) {
      key = uuidv4();
      localStorage.setItem("session_key", key);
    }
    return key;
  }, []);

  const { data, isLoading } = useGetArtworkByIdQuery({
    id: id as string,
    sessionKey,
  });
  const { data: reviewsData } = useGetArtworkReviewsQuery({
    id: id,
    page: activePage,
    limit: 5, // Show 5 reviews per page
  });
  console.log("id", reviewsData);
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({ artwork_id: id as string }).unwrap();
      notify("Success", t("AddCartSuccess"));
    } catch (error) {
      notify("Error", t("AddCartError"));
      console.log(error);
    }
  };
  const handlePurchaseOrder = async () => {
    try {
      await addToCart({ artwork_id: id as string }).unwrap();
      notify("Success", t("AddCartSuccess"));
      router.push(`/detail-checkout/${id}`);
    } catch (error) {
      notify("Error", t("AddCartError"));
      console.log(error);
    }
    router.push(`/detail-checkout/${id}?is_digital=${data?.is_digital}`);
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
      value: t("Shipping information"),
      description: t("ShippingInfoDesc"),
    },
    {
      value: t("Ratings and reviews"),
      description: t("RatingsAndReviewsDesc"),
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
      <Flex
        className="gap-10 flex-col md:flex-row px-4 md:px-20"
        align={"center"}
        justify="center"
      >
        <Box className="w-full md:w-1/2">
          <Breadcrumbs className="pb-4">{items}</Breadcrumbs>
          <Carousel withIndicators dragFree slideGap="md" align="start" h={500}>
            {data?.images.map((image: any, index: number) => (
              <CarouselSlide key={index}>
                <Image
                  src={image.url}
                  alt="Artwork preview"
                  className="rounded-md w-full object-cover"
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Box>
        <Box className="w-full md:w-1/3 mt-6 md:mt-0">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-2xl md:text-3xl">{data?.title}</p>
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
            <Button onClick={handleAddToCart}>{t("Add to cart")}</Button>
            <Button onClick={handlePurchaseOrder} variant="outline">
              {t("Purchase Order")}
            </Button>
            <Button onClick={() => setArOpened(true)} variant="light">
              {t("View in Your Room")} (AR)
            </Button>
          </Stack>
          <Box className="mt-4">
            {/* shipping */}
            <Accordion>
              <AccordionItem
                key={t("Shipping information")}
                value={t("Shipping information")}
              >
                <AccordionControl>{t("Shipping information")}</AccordionControl>
                <AccordionPanel className="text-xs">
                  {t("ShippingInfoDesc")}
                </AccordionPanel>
              </AccordionItem>
              {/* review */}
              <AccordionItem
                key={t("Ratings and reviews")}
                value={t("Ratings and reviews")}
              >
                <AccordionControl>{t("Ratings and reviews")}</AccordionControl>
                <AccordionPanel className="text-xs">
                  <Text fz={12}>{t("RatingsAndReviewsDesc")}</Text>
                  <Container className="px-4 mt-10 text-sm">
                    {reviewsData?.length ? (
                      <Box>
                        <Stack gap="lg">
                          {reviewsData.map((review: any) => (
                            <Box key={review.id} className="border-b pb-4">
                              <Group justify="space-between">
                                <Group gap="sm">
                                  <Avatar
                                    radius="xl"
                                    src={review?.user?.profile_picture}
                                    alt={review?.user?.username || "Anonymous"}
                                  />
                                  <div>
                                    <Text fw={500}>
                                      {review.user?.username || "Anonymous"}
                                    </Text>
                                    <Group gap="xs">
                                      <Rating
                                        value={review.rating}
                                        readOnly
                                        fractions={2}
                                        size="sm"
                                      />
                                      <Text fz={12} c="dimmed">
                                        {new Date(
                                          review.created_at
                                        ).toLocaleDateString()}
                                      </Text>
                                    </Group>
                                  </div>
                                </Group>
                              </Group>
                              <Text fz={12} mt="sm">
                                {review.review}
                              </Text>
                            </Box>
                          ))}
                        </Stack>

                        {reviewsData.length > 1 && (
                          <Pagination
                            mt="xl"
                            value={activePage}
                            onChange={setActivePage}
                            total={reviewsData.length}
                          />
                        )}
                      </Box>
                    ) : (
                      <Text c="dimmed">{t("No reviews yet")}</Text>
                    )}
                  </Container>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      </Flex>
      <Flex
        className="flex-col lg:flex-row gap-10 my-10 mt-20 px-4 md:px-32"
        align={"center"}
        justify="start"
      >
        <Box className="w-1/2">
          <Stack gap="md" mb="lg">
            <p className="text-lg font-bold italic">{t("About Artworks")}</p>
            <p className="text-xs">{data?.description}</p>
          </Stack>
          <Stack>
            <p className="text-lg font-bold italic">{t("Details")}</p>
            <Flex gap="md" wrap="wrap" className="text-xs">
              <p>
                <strong>{t("categories")}:</strong>
                {data?.category?.name}
              </p>
              <p>
                <strong>{t("Size")}:</strong> {data?.size?.width} x{" "}
                {data?.size?.height} {data?.size?.unit}
              </p>
              <p>
                <strong>{t("Style")}:</strong> {data?.style?.name}
              </p>
              <p>
                <strong>{t("Medium")}:</strong> {data?.medium?.name}
              </p>
              <p>
                <strong>{t("Certificate of authenticity")}:</strong> Included
                (issued by gallery)
              </p>
            </Flex>
          </Stack>
        </Box>
      </Flex>

      <Container className="px-4">
        <Flex className="flex-col md:flex-row gap-10 my-14 shadow-md p-6 md:p-10 rounded-md">
          <Flex gap="md" align={"center"}>
            <Avatar
              className="text-xl text-white rounded-full"
              src="/images/Rectangle 20.png"
              size="xl"
            />
            <Stack gap="sm" mb="lg" align="center" justify="center">
              <p className="font-semibold text-sm">
                {data?.artist?.user?.username || data?.artist?.first_name}
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
              <Button size="xs">{t("View Profile")}</Button>
            </Stack>
          </Flex>
          <Divider
            my="lg"
            labelPosition="center"
            orientation="vertical"
            className="hidden md:block"
          />
          <Stack gap="md" mb="lg">
            <p className="text-sm font-bold italic">{t("About")} </p>
            <p className="text-xs">{data?.artist?.bio}</p>
          </Stack>
        </Flex>
      </Container>
      <Discover title="Other works by Bilen" />
      {/* <Testimonials title="Related Works" /> */}
      <RecommendedArtworks artworkId={id as string} />
      <Modal
        opened={arOpened}
        onClose={() => setArOpened(false)}
        size="xl"
        fullScreen
        withCloseButton={false}
        padding={0}
      >
        {data?.images[0]?.url && <ARViewer imageUrl={data.images[0].url} />}

        {/* Info Message */}
        <Box pos="absolute" top={12} left={0} right={0} ta="center">
          <Text
            size="sm"
            c="white"
            fw={500}
            bg="rgba(0,0,0,0.6)"
            px={12}
            py={6}
            mx="auto"
            w="fit-content"
            className="rounded-md"
          >
            {t("Move to your phone to get full virtual experience")}
          </Text>
        </Box>

        {/* Exit Button */}
        <Box pos="absolute" top={60} left={0} right={0} ta="center">
          <Button onClick={() => setArOpened(false)} color="red" size="md">
            {t("Exit View")}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Page;
