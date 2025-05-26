import {
  Box,
  Flex,
  Stack,
  Text,
  TextInput,
  Button,
  ActionIcon,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("common.Footer");

  return (
    <footer>
      <Box className="container mx-auto sm:pt-16 py-10 px-4 sm:px-8">
        <Stack gap={40}>
          {/* Subscribe Section */}
          <Flex
            justify="space-between"
            align="center"
            direction={{ base: "column", sm: "row" }}
            py={20}
            px={24}
            bg={"#606C38"}
            className="gap-6 sm:gap-0 text-center sm:text-left"
          >
            {/* Title */}
            <Text
              fz={{ base: 20, sm: 32 }}
              c={"white"}
              className="playfair-display font-semibold"
            >
              {t("Subscribe to our newsletter")}
            </Text>

            {/* Email input and button */}
            <Flex
              direction={{ base: "column", sm: "row" }}
              w={{ base: "100%", sm: "60%" }}
              gap={10}
            >
              <TextInput
                placeholder={t("Enter your email")}
                w={{ base: "100%", sm: "50%" }}
                size="md"
                radius={0}
              />
              <Button
                radius={0}
                size="md"
                className="tracking-[0.1em] w-full sm:w-auto bg-[#bc6c25]"
                bg={"#bc6c25"}
              >
                {t("Subscribe")}
              </Button>
            </Flex>
          </Flex>

          {/* Bottom Bar */}
          <Flex
            justify={"space-between"}
            align={"center"}
            direction={{ base: "column", sm: "row" }}
            py={20}
            px={24}
            className="gap-4 sm:gap-0 text-center sm:text-left"
          >
            {/* Copyright */}
            <Text
              fz={{ base: 12, sm: 16 }}
              c={"dimmed"}
              className="tracking-wide"
            >
              © 2025 {t("Copyright All rights reserved")}
            </Text>

            {/* Social Icons */}
            <Flex gap={10}>
              <ActionIcon variant="transparent">
                <IconBrandX size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconBrandYoutube size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconBrandInstagram size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconBrandTiktok size={18} stroke={1.5} />
              </ActionIcon>
            </Flex>

            {/* Terms */}
            <Link href={"/privacy-policy"} className="hover:underline">
              <Text c={"dimmed"} fz={{ base: 12, sm: 14 }}>
                {t("Terms")}
              </Text>
            </Link>
          </Flex>
        </Stack>
      </Box>
    </footer>
  );
}
