"use client";

import { IconShoppingCart } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { useAddCartItemMutation } from "@/store/api/artwork/cart";
import { notify } from "@/shared/components/notification/notification";
import { useTranslations } from "next-intl";
const AddtoCart = ({ id }: { id: string }) => {
  const t = useTranslations("common.Cart"); 
  const [addToCart] = useAddCartItemMutation();
  const [isInCart, setIsInCart] = useState(false);
  const handleAddToCart = async () => {
    try {
      await addToCart({ artwork_id: id }).unwrap();
      setIsInCart(true)
      notify("Success", t("itemAdded"));
    } catch (error) {
      notify("Error", t("itemAddError"));
      console.log(error);
    }
  };
  return (
    <>
      <IconShoppingCart
        onClick={handleAddToCart}
        size={20}
        color={isInCart ? "red" : "gray"}
        className="cursor-pointer text-sm"
      />
    </>
  );
};

export default AddtoCart;
