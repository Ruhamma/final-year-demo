"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  NumberFormatter,
  Pagination,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconFilter,
  IconSearch,
  IconX,
  IconCheck,
  IconStar,
  IconBrush,
  IconHeart,
  IconRulerMeasure,
  IconTags,
  IconCategory,
  IconCurrency,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useGetMetadataQuery } from "@/store/api/artwork/artwork";
import {
  useListArtworksQuery,
  useToggleActivateArtworkMutation,
  useToggleFeatureArtworkMutation,
  useGetArtworkQuery,
} from "@/store/api/admin/admin";
import { notify } from "@/shared/components/notification/notification";

const Page = () => {
  const limit = 12;
  const [page, setPage] = useState(1);
  const skip = (page - 1) * limit;
  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 300);
  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    medium: "",
    style: "",
    category: "",
    is_active: "",
    is_featured: "",
  });

  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: metadata } = useGetMetadataQuery({});
  const filterParams = {
    search: debounced,
    category_id: selectedFilters.category || undefined,
    medium_id: selectedFilters.medium || undefined,
    style_id: selectedFilters.style || undefined,
    is_active:
      selectedFilters.is_active === "true"
        ? true
        : selectedFilters.is_active === "false"
        ? false
        : undefined,
    is_featured:
      selectedFilters.is_featured === "true"
        ? true
        : selectedFilters.is_featured === "false"
        ? false
        : undefined,
    price_min: selectedFilters.price === "Low to High" ? 0 : undefined,
    price_max: selectedFilters.price === "High to Low" ? 1000000 : undefined,
  };

  const { data, isLoading } = useListArtworksQuery({
    skip,
    limit,
    ...filterParams,
  });

  const [toggleFeature] = useToggleFeatureArtworkMutation();
  const [toggleActivate] = useToggleActivateArtworkMutation();

  const artworks = data?.artworks || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const { data: detail, isFetching: isDetailLoading } = useGetArtworkQuery(
    selectedArtworkId!,
    { skip: !selectedArtworkId }
  );

  const handleClear = () => {
    setSelectedFilters({
      price: "",
      medium: "",
      style: "",
      category: "",
      is_active: "",
      is_featured: "",
    });
  };

  const handleToggleFeature = async (artId: string, current: boolean) => {
    try {
      await toggleFeature({ artworkId: artId, feature: !current }).unwrap();
      notify(
        "Success",
        `Artwork ${!current ? "featured" : "unfeatured"} successfully`
      );
    } catch {
      notify("Error", "Failed to toggle feature status");
    }
  };

  const handleToggleActivate = async (artId: string, current: boolean) => {
    try {
      await toggleActivate({ artworkId: artId, is_active: !current }).unwrap();
      notify(
        "Success",
        `Artwork ${!current ? "activated" : "deactivated"} successfully`
      );
    } catch {
      notify("Error", "Failed to toggle activation status");
    }
  };

  const openArtworkDetail = (id: string) => {
    setSelectedArtworkId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full p-10">
      <LoadingOverlay visible={isLoading} />
      <Box mb="xl">
        <Group align="center" gap="sm" mb="xs">
          <ThemeIcon variant="light" color="green" size="lg" radius="xl">
            <IconBrush size={20} />
          </ThemeIcon>
          <Title order={2} size="xl">
            Artwork Management
          </Title>
        </Group>
        <Text c="dimmed" size="sm" mb="md">
          View, manage, and moderate all artworks uploaded by artists.
        </Text>
        <Divider my="sm" />
      </Box>
      <div className="p-6 rounded-md">
        <div className=" p-4 mb-2 rounded-md">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search"
            leftSection={<IconSearch size={16} />}
            className="w mb-4"
          />
          <Flex
            gap="xs"
            className="flex mb-6 w-full justify-center items-center wrap"
          >
            <Select
              placeholder="Price"
              data={["Low to High", "High to Low"]}
              value={selectedFilters.price}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, price: val || "" }))
              }
            />
            <Select
              placeholder="Active Status"
              data={[
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ]}
              value={selectedFilters.is_active}
              onChange={(val) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  is_active: val || "",
                }))
              }
            />
            <Select
              placeholder="Featured"
              data={[
                { value: "true", label: "Featured" },
                { value: "false", label: "Not Featured" },
              ]}
              value={selectedFilters.is_featured}
              onChange={(val) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  is_featured: val || "",
                }))
              }
            />
            <Select
              placeholder="Category"
              data={metadata?.categories.map((cat: any) => ({
                value: cat.id,
                label: cat.name,
              }))}
              value={selectedFilters.category}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, category: val || "" }))
              }
            />
            <Select
              placeholder="Medium"
              data={metadata?.media.map((m: any) => ({
                value: m.id,
                label: m.name,
              }))}
              value={selectedFilters.medium}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, medium: val || "" }))
              }
            />
            <Select
              placeholder="Style"
              data={metadata?.styles.map((s: any) => ({
                value: s.id,
                label: s.name,
              }))}
              value={selectedFilters.style}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, style: val || "" }))
              }
            />
            <Button
              variant="light"
              onClick={handleClear}
              leftSection={<IconFilter />}
            >
              Clear
            </Button>
          </Flex>
        </div>

        <Center>
          <Box className="grid grid-cols-2 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artworks.map((art: any) => (
              <Card key={art.id} withBorder radius="md">
                <CardSection>
                  <Image
                    src={art?.images?.[0]?.url}
                    alt="artwork image"
                    height={160}
                  />
                </CardSection>
                <Stack gap="xs" className="mt-2">
                  <Text
                    className="font-semibold text-sm cursor-pointer hover:underline"
                    onClick={() => openArtworkDetail(art.id)}
                  >
                    {art.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {art.description}
                  </Text>
                  <Group justify="space-between">
                    <NumberFormatter
                      value={art.price}
                      prefix="ETB "
                      thousandSeparator
                    />
                    <Group gap={4}>
                      <Tooltip
                        label={art.is_featured ? "Unfeature" : "Feature"}
                      >
                        <IconStar
                          size={18}
                          className={`cursor-pointer ${
                            art.is_featured
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                          onClick={() =>
                            handleToggleFeature(art.id, art.is_featured)
                          }
                        />
                      </Tooltip>
                      <Tooltip
                        label={art.is_active ? "Deactivate" : "Activate"}
                      >
                        {art.is_active ? (
                          <IconX
                            size={18}
                            className="cursor-pointer text-red-500"
                            onClick={() =>
                              handleToggleActivate(art.id, art.is_active)
                            }
                          />
                        ) : (
                          <IconCheck
                            size={18}
                            className="cursor-pointer text-green-500"
                            onClick={() =>
                              handleToggleActivate(art.id, art.is_active)
                            }
                          />
                        )}
                      </Tooltip>
                    </Group>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Box>
        </Center>

        <Center className="mt-8">
          <Pagination
            value={page}
            onChange={setPage}
            total={totalPages}
            siblings={1}
            boundaries={1}
          />
        </Center>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={<Title order={4}>{detail?.title || "Artwork Detail"}</Title>}
        size="lg"
        centered
      >
        {isDetailLoading ? (
          <Text>Loading...</Text>
        ) : detail ? (
          <Stack>
            <Image
              src={detail.images?.[0]?.url}
              height={300}
              radius="md"
              alt="Artwork"
            />

            <Box>
              <Title order={5}>{detail.title}</Title>
              <Text c="dimmed" size="sm">
                {detail.description}
              </Text>
            </Box>

            <Divider my="sm" />

            <Group gap="xs">
              <IconUser size={18} />
              <Text>
                Artist:{" "}
                <strong>
                  {detail.artist?.user?.username || "Unknown Artist"}
                </strong>
              </Text>
            </Group>

            <Group gap="xs">
              <IconCurrency size={18} />
              <Text>
                Price:{" "}
                <strong>
                  <NumberFormatter
                    value={detail.price}
                    thousandSeparator
                    prefix="ETB"
                  />
                </strong>
              </Text>
            </Group>

            <Group gap="xs">
              <IconCategory size={18} />
              <Text>Category: {detail.category?.name}</Text>
            </Group>

            <Group gap="xs">
              <IconBrush size={18} />
              <Text>Medium: {detail.medium?.name}</Text>
            </Group>

            <Group gap="xs">
              <IconTags size={18} />
              <Text>Style: {detail.style?.name}</Text>
            </Group>

            <Group gap="xs">
              <IconRulerMeasure size={18} />
              <Text>
                Size: {detail.size?.width} × {detail.size?.height}{" "}
                {detail.size?.unit}
              </Text>
            </Group>

            <Group gap="xs">
              {detail.is_featured && <Badge color="yellow">Featured</Badge>}
              {detail.is_active ? (
                <Badge color="green">Active</Badge>
              ) : (
                <Badge color="red">Inactive</Badge>
              )}
              {detail.is_sold && <Badge color="gray">Sold</Badge>}
            </Group>

            <Divider my="sm" />

            <Group gap="xs">
              <IconStar size={18} />
              <Text>
                Rating: {detail.average_rating?.toFixed(1) || "0"} (
                {detail.rating_count} ratings)
              </Text>
            </Group>

            <Group gap="xs">
              <IconHeart size={18} />
              <Text>Favorites: {detail.favorite_count || 0}</Text>
            </Group>
          </Stack>
        ) : (
          <Text>No data found</Text>
        )}
      </Modal>
      ;
    </div>
  );
};

export default Page;
