"use client";

import {
  Drawer,
  Button,
  Group,
  Text,
  Divider,
  ScrollArea,
  Box,
  LoadingOverlay,
  Image,
  NumberFormatter,
  Stack,
  Tooltip,
  Loader,
} from "@mantine/core";
import { IconHeart, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import {
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from "@/store/api/artwork/artwork";
import { notify } from "@/shared/components/notification/notification";
const WishlistDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: favorites, isLoading } = useGetFavoritesQuery({});
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const [removingItemId, setRemovingItemId] = React.useState<string | null>(
    null
  );
  const handleRemoveFromFavorites = (id: string) => {
    setRemovingItemId(id);
    try {
      removeFromFavorites(id).unwrap();
      notify("Success", "Item removed from favorites");
    } catch (error) {
      notify("Error", "Failed to remove item from favorites");
    }
  };
  return (
    <>
      <Box className="relative" onClick={open}>
        <IconHeart className="text-sm" size={20} stroke={1.5} />
        <Box className="absolute top-[-4px] right-[-4px] bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {favorites?.total}
        </Box>
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        title="Your Wishlist"
        position="right"
        size="md"
        padding="md"
        classNames={{ body: "p-4" }}
      >
        <LoadingOverlay visible={isLoading} />
        <ScrollArea h="70vh">
          <Text size="sm" c="dimmed" className="text-center">
            Manage your favorite artworks
          </Text>
          <Divider my="sm" />
          {favorites?.artworks?.map((item: any, index: any) => (
            <Box className="space-y-4 pt-5" key={index}>
              <Group justify="space-between" className="border-b pb-6">
                <Group>
                  <Image
                    src={item?.images[0]?.url}
                    alt={item?.title}
                    width={10}
                    height={10}
                    className="rounded w-[50px] h-[50px]"
                  />
                  <Stack>
                    <Text size="sm">{item?.title}</Text>
                    <Text size="sm" c="dimmed">
                      <NumberFormatter
                        value={item?.price}
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        prefix={"ETB "}
                        className="text-sm"
                      />
                    </Text>
                  </Stack>
                </Group>
                <Button
                  variant="transparent"
                  color="dark"
                  onClick={() => handleRemoveFromFavorites(item?.id)}
                  loading={removingItemId === item?.id}
                >
                  <Tooltip label="Remove from cart">
                    {removingItemId === item?.id ? (
                      <Loader size="xs" />
                    ) : (
                      <IconTrash color="red" size={16} />
                    )}
                  </Tooltip>
                </Button>
              </Group>
            </Box>
          ))}
        </ScrollArea>
      </Drawer>
    </>
  );
};

export default WishlistDrawer;
