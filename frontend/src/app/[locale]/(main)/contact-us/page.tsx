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

export default function Page() {
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
        <Stack spacing="md">
          <Text
            fz={30}
            className="font-semibold playfair-display text-center sm:text-4xl text-2xl"
          >
            Get In Touch With Us
          </Text>
          <Text c={"dimmed"} className="text-center text-sm sm:text-base">
            For more information about our product & services, feel free to drop
            us an email.
            <br />
            Our staff will always be there to help you out. Don’t hesitate!
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
                  Address
                </Text>
                <Text className="text-sm">
                  236 5th SE Avenue, New York
                  <br />
                  NY10000, United States
                </Text>
              </Stack>
            </Flex>

            <Flex gap={20} align="flex-start">
              <IconPhoneFilled size={24} />
              <Stack gap={5}>
                <Text fz={20} fw={600}>
                  Phone
                </Text>
                <Text className="text-sm">
                  Mobile: +(84) 546-6789
                  <br />
                  Hotline: +(84) 456-6789
                </Text>
              </Stack>
            </Flex>

            <Flex gap={20} align="flex-start">
              <IconClockFilled size={24} />
              <Stack gap={5}>
                <Text fz={20} fw={600}>
                  Working Time
                </Text>
                <Text className="text-sm">
                  Monday–Friday: 9:00 – 22:00
                  <br />
                  Saturday–Sunday: 9:00 – 21:00
                </Text>
              </Stack>
            </Flex>
          </Stack>

          {/* Contact Form */}
          <Stack className="w-full lg:w-2/3 gap-6">
            <TextInput
              placeholder="Jane"
              label="First Name"
              size="lg"
              radius={8}
              className="w-full tracking-wide"
              styles={{
                label: { marginBottom: "12px" },
              }}
            />
            <TextInput
              placeholder="example@gmail.com"
              label="Email Address"
              size="lg"
              radius={8}
              className="w-full tracking-wide"
              styles={{
                label: { marginBottom: "12px" },
              }}
            />
            <Textarea
              placeholder="Write your message here..."
              label="Subject"
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
              Submit
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}
