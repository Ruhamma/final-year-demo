import {
  Box,
  Image,
  Text,
  Stack,
  Flex,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import {
  IconMapPinFilled,
  IconPhoneFilled,
  IconClockFilled,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("common.Contact");
  return (
    <Box className="container mx-auto sm:pt-16 py-10 px-4">
      {/* Header Image */}
      <Image
        src={"/images/contact.png"}
        alt="Contact Us"
        width={"100%"}
        height={500}
        className="mx-auto object-cover rounded-md"
      />

      {/* Text Section */}
      <Box className="container mx-auto py-16">
        <Stack gap="md">
          <Text
            fz={30}
            className="font-semibold playfair-display text-center sm:text-4xl text-2xl"
          >
            {t("Title")}
          </Text>
          <Text c={"dimmed"} className="text-center text-sm sm:text-base">
            {t("Description")}
            <br />
            {t("Description2")}
          </Text>
        </Stack>

        {/* Main Content Section */}
        <Flex
          className="flex-col lg:flex-row gap-10 mt-10"
          align="start"
          justify="space-between"
          p={20}
        >
          {/* Contact Info */}
          <Stack className="w-full lg:w-1/3 gap-8">
            <Flex gap={20} align="flex-start">
              <IconMapPinFilled size={24} />
              <Stack gap={5}>
                <Text fz={20} fw={600}>
                  {t("Address")}
                </Text>
                <Text className="text-sm">
                  {t("Address2")}
                  <br />
                  {t("City")}
                </Text>
              </Stack>
            </Flex>

            <Flex gap={20} align="flex-start">
              <IconPhoneFilled size={24} />
              <Stack gap={5}>
                <Text fz={20} fw={600}>
                  {t("Phone")}
                </Text>
                <Text className="text-sm">
                  {t("Mobile")}: +(251) 9546-67891
                  <br />
                  {t("Hotline")}: +(251) 9456-67891
                </Text>
              </Stack>
            </Flex>

            <Flex gap={20} align="flex-start">
              <IconClockFilled size={24} />
              <Stack gap={5}>
                <Text fz={20} fw={600}>
                  {t("Working Time")}
                </Text>
                <Text className="text-sm">
                  {t("Monday")}: 9:00 – 22:00
                  <br />
                  {t("Saturday")}: 9:00 – 21:00
                </Text>
              </Stack>
            </Flex>
          </Stack>

          {/* Contact Form */}
          <Stack className="w-full lg:w-2/3 gap-6">
            <TextInput
              placeholder={t("NamePlaceholder")}
              label={t("Name")}
              size="lg"
              radius={8}
              className="w-full tracking-wide"
              styles={{
                label: { marginBottom: "12px" },
              }}
            />
            <TextInput
              placeholder="example@gmail.com"
              label={t("Email")}
              size="lg"
              radius={8}
              className="w-full tracking-wide"
              styles={{
                label: { marginBottom: "12px" },
              }}
            />
            <Textarea
              placeholder={t("SubjectPlaceholder")}
              label={t("Subject")}
              size="lg"
              radius={8}
              className="w-full tracking-wide"
              minRows={5}
              styles={{
                label: { marginBottom: "12px" },
              }}
            />
            <Button
              radius={8}
              size="lg"
              bg="#BC6C25"
              color="#fff"
              className="self-end w-full sm:w-[40%] md:w-[30%] lg:w-[20%]"
            >
              {t("Submit")}
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}
