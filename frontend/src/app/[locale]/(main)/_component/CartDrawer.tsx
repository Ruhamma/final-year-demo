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
  Loader,
  Tooltip,
  NumberFormatter,
  Image,
  Stack,
} from "@mantine/core";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
} from "@/store/api/artwork/cart";
import { notify } from "@/shared/components/notification/notification";
import { useClearCartMutation } from "@/app/services/cart";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CartDrawer = () => {
  const t = useTranslations("common.Cart");
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: cart, isLoading } = useGetCartQuery({});
  const [removeFromCart] = useRemoveCartItemMutation();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const cartCount = cart?.items?.length || 0;

  const handleRemoveFromCart = async (id: string) => {
    setRemovingItemId(id);
    try {
      await removeFromCart(id).unwrap();
      notify("Success", t("notifications.itemRemoved"));
    } catch (error) {
      notify("Error", t("notifications.itemRemoveError"));
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      notify("Success", t("notifications.cartCleared"));
    } catch (error) {
      notify("Error", t("notifications.cartClearError"));
    }
  };

  return (
    <>
      <Box className="relative" onClick={open}>
        <IconShoppingCart
          onClick={open}
          className="text-sm"
          size={20}
          stroke={1.5}
        />
        <Box className="absolute top-[-4px] right-[-4px] bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {cartCount}
        </Box>
      </Box>
      <Drawer
        opened={opened}
        onClose={close}
        title={t("YourCart")}
        position="right"
        size="md"
        padding="md"
        classNames={{ body: "p-4" }}
      >
        <LoadingOverlay visible={isLoading} />
        <ScrollArea h="70vh">
          <Text size="sm" c="dimmed" className="text-center">
            {t("ManageCart")}
          </Text>
          <Divider my="sm" />
          {cart?.items?.map((item: any) => (
            <Box className="space-y-4 pt-5" key={item?.id}>
              <Group justify="space-between" className="border-b pb-6">
                <Group>
                  <Image
                    src={item?.artwork?.images[0]?.url}
                    alt={item?.artwork?.title}
                    width={10}
                    height={10}
                    className="rounded w-[50px] h-[50px]"
                  />
                  <Stack>
                    <Text
                      size="sm"
                      onClick={() => router.push(`/art-page/${item.id}`)}
                    >
                      {item?.artwork?.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      <NumberFormatter
                        value={item?.price_at_addition}
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
                  onClick={() => handleRemoveFromCart(item?.id)}
                  loading={removingItemId === item?.id}
                >
                  <Tooltip label={t("removeItem")}>
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

        <Divider className="my-4" />

        <Group justify="space-between" className="mt-4">
          <Text>
            {t("Total")} {cart?.total_price}
          </Text>
          <Button
            color="dark"
            fullWidth
            onClick={() => {
              router.push("/checkout-page");
              close();
            }}
          >
            {t("Checkout")}
          </Button>
          <Button
            variant="outline"
            color="dark"
            fullWidth
            onClick={handleClearCart}
            loading={isClearing}
          >
            {t("ClearCart")}
          </Button>
        </Group>
      </Drawer>
    </>
  );
};

export default CartDrawer;
