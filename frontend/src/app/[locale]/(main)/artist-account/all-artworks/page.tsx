"use client";
import {
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  NumberFormatter,
  Pagination,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconFilter,
  IconHeart,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useAuth } from "@/context/useAuth";
import { formatDate } from "@/shared/utils/formatDate";
import {
  useDeleteMyArtworkMutation,
  useGetMetadataQuery,
  useGetMyArtworksQuery,
} from "@/store/api/artwork/artwork";
import { useDebouncedValue } from "@mantine/hooks";
import { notify } from "@/shared/components/notification/notification";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 12;
  const skip = (page - 1) * limit;
  const { data: metadata } = useGetMetadataQuery({});
  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 300);
  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    medium: "",
    style: "",
    category: "",
  });
  const { user } = useAuth();
 
  const { data, isLoading } = useGetMyArtworksQuery({
    skip,
    limit,
    search: debounced,
    price: selectedFilters.price,
    category: selectedFilters.category,
    medium: selectedFilters.medium,
    style: selectedFilters.style,
  });
  const [removeArtwork] = useDeleteMyArtworkMutation();
  const artworks = data?.artworks || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const handleClear = () => {
    setSelectedFilters({ price: "", medium: "", style: "", category: "" });
  };
  const handleRemove = async (id: string) => {
    try {
      await removeArtwork(id).unwrap();
      notify("Success", "Artwork removed successfully");
    } catch (error) {
      console.error("Failed to remove artwork:", error);
    }
  };
  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      <Stack gap={10}>
        <p className="text-xl font-bold">Hello {user?.username}!</p>
        <Text c="dimmed" size="xs">
          Joined {formatDate(user?.created_at || "")}
        </Text>
        <Divider />
        <p className="text-lg my-4">All Artworks</p>
      </Stack>
      <div className="bg-[#fefae0] p-6">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <Group gap="xs">
            <Select
              placeholder="Price"
              data={["Low to High", "High to Low"]}
              value={selectedFilters.price}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, price: val || "" }))
              }
              className="w-32"
            />
            <Select
              placeholder="Categories"
              data={metadata?.categories.map((cat: any) => ({
                value: cat.id,
                label: cat.name,
              }))}
              value={selectedFilters.category}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, category: val || "" }))
              }
              className="w-32"
            />
            <Select
              placeholder="Medium"
              data={metadata?.media.map((medium: any) => ({
                value: medium.id,
                label: medium.name,
              }))}
              value={selectedFilters.medium}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, medium: val || "" }))
              }
              className="w-32"
            />
            <Select
              placeholder="Style"
              data={metadata?.styles.map((style: any) => ({
                value: style.id,
                label: style.name,
              }))}
              value={selectedFilters.style}
              onChange={(val) =>
                setSelectedFilters((prev) => ({ ...prev, style: val || "" }))
              }
              className="w-32"
            />

            <Button variant="subtle" onClick={handleClear}>
              Clear all
            </Button>
          </Group>

          <Group gap="xs">
            <TextInput
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="Search"
              leftSection={<IconSearch size={16} />}
              className="mr-10"
              classNames={{
                input:
                  "bg-transparent border-b border-gray-400 rounded-none focus:border-black focus:ring-0",
              }}
            />
          </Group>
        </div>
      </div>
      <Center className="py-10 mx-auto flex flex-col gap-6">
        <Box className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {artworks?.map((item: any) => (
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
                <Group gap="xs">
                  <IconEye size={18} />
                  <Text size="xs" c="dimmed">
                    {item?.view_count ?? 0}
                  </Text>
                  <IconEdit
                    size={18}
                    className="cursor-pointer hover:text-yellow-400"
                    onClick={() =>
                      router.push(`/artist-account/edit-artwork/${item?.id}`)
                    }
                  />
                  <IconTrash
                    size={18}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemove(item.id)}
                  />
                </Group>
              </Group>

              <Text c="dimmed" className="text-xs font-semibold" size="xs">
                {item?.description}
              </Text>

              <Text className="text-xs font-semibold" size="xs">
                <NumberFormatter
                  value={item?.price}
                  thousandSeparator
                  prefix="ETB "
                />
              </Text>
            </Card>
          ))}
        </Box>
        <Pagination
          value={page}
          onChange={setPage}
          total={totalPages}
          siblings={1}
          boundaries={1}
        />
      </Center>
    </div>
  );
};

export default Page;
