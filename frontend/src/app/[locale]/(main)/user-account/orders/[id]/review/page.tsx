"use client";
import { useState } from "react";
import {
  Tabs,
  Text,
  Rating,
  Textarea,
  Button,
  Paper,
  Title,
  Divider,
  Group,
  Stack,
  Loader,
  Avatar,
  Select,
  Center,
} from "@mantine/core";
import {
  IconBrush,
  IconUser,
  IconStarFilled,
  IconCheck,
  IconArrowLeft,
  IconPackageOff,
} from "@tabler/icons-react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useReviewArtistMutation } from "@/store/api/artist/profile";
import { useReviewArtworkMutation } from "@/store/api/artwork/artwork";
import { useGetOrderByIdQuery } from "@/store/api/order/order";
import { notify } from "@/shared/components/notification/notification";
import { useTranslations } from "next-intl";

// Create Zod schemas with translation keys
const createArtworkReviewSchema = (t: (key: string) => string) =>
  z.object({
    artworkId: z.string().min(1, t("validation.artworkRequired")),
    rating: z.number().min(1, t("validation.ratingRequired")).max(5),
    review: z
      .string()
      .min(1, t("validation.reviewRequired"))
      .max(350, t("validation.reviewMaxLength")),
  });

const createArtistReviewSchema = (t: (key: string) => string) =>
  z.object({
    artistId: z.string().min(1, t("validation.artistRequired")),
    rating: z.number().min(1, t("validation.ratingRequired")).max(5),
    review: z
      .string()
      .min(1, t("validation.reviewRequired"))
      .max(350, t("validation.reviewMaxLength")),
  });

type ArtworkReviewFormData = z.infer<
  ReturnType<typeof createArtworkReviewSchema>
>;
type ArtistReviewFormData = z.infer<
  ReturnType<typeof createArtistReviewSchema>
>;

const ReviewPage = () => {
  const router = useRouter();
  const { id: orderId } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"artwork" | "artist">("artwork");
  const t = useTranslations("common.review");

  // Create schemas with translations
  const artworkReviewSchema = createArtworkReviewSchema(t);
  const artistReviewSchema = createArtistReviewSchema(t);

  // API hooks
  const { data: order, isLoading: isOrderLoading } =
    useGetOrderByIdQuery(orderId);
  const [reviewArtwork, { isLoading: isArtworkSubmitting }] =
    useReviewArtworkMutation();
  const [reviewArtist, { isLoading: isArtistSubmitting }] =
    useReviewArtistMutation();

  // Get unique artists from order items
  const uniqueArtists = Array.from(
    new Set(
      order?.items.map((item: any) => ({
        id: item.artist_id,
        name: item.artist_name,
      })) || []
    )
  ).reduce((acc: { id: string; name: string }[], current: any) => {
    if (!acc.some((artist) => artist.id === current.id)) {
      acc.push(current);
    }
    return acc;
  }, [] as { id: string; name: string }[]);

  // React Hook Form setup
  const artworkForm = useForm<ArtworkReviewFormData>({
    resolver: zodResolver(artworkReviewSchema),
    defaultValues: {
      artworkId: "",
      rating: 0,
      review: "",
    },
  });

  const artistForm = useForm<ArtistReviewFormData>({
    resolver: zodResolver(artistReviewSchema),
    defaultValues: {
      artistId: "",
      rating: 0,
      review: "",
    },
  });

  const handleArtworkSubmit = async (data: ArtworkReviewFormData) => {
    console.log("Submitting artwork review:", data);
    try {
      await reviewArtwork({
        id: data.artworkId,
        body: {
          rating: data.rating,
          review: data.review,
        },
      }).unwrap();
      notify("Success", t("notifications.artworkSuccess"));
    } catch (error: any) {
      notify(
        "Error",
        `${t("notifications.artworkError")}: ${error?.data?.detail}`
      );
    }
  };

  const handleArtistSubmit = async (data: ArtistReviewFormData) => {
    try {
      await reviewArtist({
        id: data.artistId,
        body: {
          rating: data.rating,
          review: data.review,
        },
      }).unwrap();
      notify("Success", t("notifications.artistSuccess"));
    } catch (error: any) {
      notify(
        "Error",
        `${t("notifications.artistError")}: ${error?.data?.detail}`
      );
    }
  };

  if (isOrderLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!order) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="xs">
          <IconPackageOff size={48} stroke={1.5} color="gray" />
          <Text size="lg" c="dimmed">
            {t("errors.orderNotFound")}
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={18} />}
        onClick={() => router.push(`/orders`)}
        className="mb-4"
      >
        {t("backButton")}
      </Button>

      <Title order={2} className="mb-6 text-gray-800">
        {t("pageTitle")}
      </Title>

      <Tabs
        value={activeTab}
        onChange={(value) =>
          setActiveTab((value as "artwork" | "artist") || "artwork")
        }
        className="mb-8"
      >
        <Tabs.List>
          <Tabs.Tab
            value="artwork"
            leftSection={<IconBrush size={18} />}
            className="text-sm font-medium"
          >
            {t("tabs.artwork")}
          </Tabs.Tab>
          <Tabs.Tab
            value="artist"
            leftSection={<IconUser size={18} />}
            className="text-sm font-medium"
          >
            {t("tabs.artist")}
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === "artwork" ? (
        <Paper withBorder p="md" className="bg-white rounded-lg">
          <form onSubmit={artworkForm.handleSubmit(handleArtworkSubmit)}>
            <Stack gap="md">
              <div>
                <Text fw={500} className="mb-2">
                  {t("artworkForm.selectLabel")}
                </Text>
                <Select
                  placeholder={t("artworkForm.selectPlaceholder")}
                  data={order.items.map((item: any) => ({
                    value: item?.artwork_id,
                    label: `${item.artwork_title}`,
                  }))}
                  error={artworkForm.formState.errors.artworkId?.message}
                  {...artworkForm.register("artworkId")}
                  onChange={(value) =>
                    artworkForm.setValue("artworkId", value || "")
                  }
                />
              </div>

              <Divider my="sm" />

              <div>
                <Text fw={500} className="mb-2">
                  {t("artworkForm.ratingLabel")}
                </Text>
                <Rating
                  fractions={2}
                  count={5}
                  value={artworkForm.watch("rating")}
                  onChange={(value) => artworkForm.setValue("rating", value)}
                  emptySymbol={
                    <IconStarFilled
                      style={{ color: "var(--mantine-color-gray-3)" }}
                    />
                  }
                  fullSymbol={
                    <IconStarFilled
                      style={{ color: "var(--mantine-color-yellow-6)" }}
                    />
                  }
                  size="lg"
                />
                {artworkForm.formState.errors.rating && (
                  <Text c="red" size="sm" mt={4}>
                    {artworkForm.formState.errors.rating.message}
                  </Text>
                )}
              </div>

              <div>
                <Text fw={500} className="mb-2">
                  {t("artworkForm.reviewLabel")}
                </Text>
                <Textarea
                  placeholder={t("artworkForm.reviewPlaceholder")}
                  autosize
                  minRows={4}
                  maxRows={6}
                  error={artworkForm.formState.errors.review?.message}
                  {...artworkForm.register("review")}
                />
                <Text size="xs" c="dimmed" ta="right" mt={4}>
                  {artworkForm.watch("review")?.length || 0}/350{" "}
                  {t("validation.characters")}
                </Text>
              </div>

              <Button
                type="submit"
                className="mt-4"
                loading={isArtworkSubmitting}
                leftSection={<IconCheck size={18} />}
              >
                {t("artworkForm.submitButton")}
              </Button>
            </Stack>
          </form>
        </Paper>
      ) : (
        <Paper withBorder p="md" className="bg-white rounded-lg">
          <form onSubmit={artistForm.handleSubmit(handleArtistSubmit)}>
            <Stack gap="md">
              <div>
                <Text fw={500} className="mb-2">
                  {t("artistForm.selectLabel")}
                </Text>
                <Select
                  placeholder={t("artistForm.selectPlaceholder")}
                  data={uniqueArtists.map((artist) => ({
                    value: artist.id ?? "",
                    label: artist.name,
                  }))}
                  error={artistForm.formState.errors.artistId?.message}
                  {...artistForm.register("artistId")}
                  onChange={(value) =>
                    artistForm.setValue("artistId", value || "")
                  }
                />
              </div>

              <Divider my="sm" />

              <div>
                <Text fw={500} className="mb-2">
                  {t("artistForm.ratingLabel")}
                </Text>
                <Rating
                  fractions={2}
                  count={5}
                  value={artistForm.watch("rating")}
                  onChange={(value) => artistForm.setValue("rating", value)}
                  emptySymbol={
                    <IconStarFilled
                      style={{ color: "var(--mantine-color-gray-3)" }}
                    />
                  }
                  fullSymbol={
                    <IconStarFilled
                      style={{ color: "var(--mantine-color-yellow-6)" }}
                    />
                  }
                  size="lg"
                />
                {artistForm.formState.errors.rating && (
                  <Text c="red" size="sm" mt={4}>
                    {artistForm.formState.errors.rating.message}
                  </Text>
                )}
              </div>

              <div>
                <Text fw={500} className="mb-2">
                  {t("artistForm.reviewLabel")}
                </Text>
                <Textarea
                  placeholder={t("artistForm.reviewPlaceholder")}
                  autosize
                  minRows={4}
                  maxRows={6}
                  error={artistForm.formState.errors.review?.message}
                  {...artistForm.register("review")}
                />
                <Text size="xs" c="dimmed" ta="right" mt={4}>
                  {artistForm.watch("review")?.length || 0}/350{" "}
                  {t("validation.characters")}
                </Text>
              </div>

              <Button
                type="submit"
                className="mt-4"
                loading={isArtistSubmitting}
                leftSection={<IconCheck size={18} />}
              >
                {t("artistForm.submitButton")}
              </Button>
            </Stack>
          </form>
        </Paper>
      )}
    </div>
  );
};

export default ReviewPage;
