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
    <Box className="container mx-auto sm:pt-16 py-10">
      <Image
        src={"/images/contact.png"}
        alt="Contact Us"
        width={"100%"}
        height={500}
        className="mx-auto"
      />
      <Box className="container mx-auto py-30">
        <Stack>
          <Text fz={38} className="font-semibold playfair-display text-center">
            Get In Touch With Us
          </Text>
          <Text c={"dimmed"} className="text-center">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. <br /> Our Staff Always Be There To Help You
            Out. Do Not Hesitate!
          </Text>
        </Stack>

        <Flex
          align={"baseline"}
          justify={"space-evenly"}
          w={"100%"}
          gap={50}
          p={80}
        >
          <Stack w={"30%"} gap={"xl"}>
            <Flex gap={20} align={"baseline"}>
              <IconMapPinFilled />
              <Stack gap={5}>
                <Text fz={24} fw={600}>
                  Address
                </Text>
                <Text>
                  236 5th SE Avenue, New York <br /> NY10000, United States
                </Text>
              </Stack>
            </Flex>
            <Flex gap={20} align={"baseline"}>
              <IconPhoneFilled />
              <Stack gap={5} p={0}>
                <Text fz={24} fw={600} p={0}>
                  Phone
                </Text>
                <Text>
                  Mobile: +(84) 546-6789
                  <br /> Hotline: +(84) 456-6789
                </Text>
              </Stack>
            </Flex>
            <Flex gap={20} align={"baseline"}>
              <IconClockFilled />
              <Stack gap={5}>
                <Text fz={24} fw={600}>
                  Working Time
                </Text>
                <Text>
                  Monday-Friday: 9:00 - 22:00
                  <br /> Saturday-Sunday: 9:00 - 21:00
                </Text>
              </Stack>
            </Flex>
          </Stack>
          <Stack w={"50%"} gap={"xl"}>
            <TextInput
              placeholder="Jane"
              label="First Name"
              size={"lg"}
              radius={8}
              className="tracking-[0.1em] w-[100%]"
             styles={{
               label: {
                 marginBottom: "18px",
               },
             }} 
            ></TextInput>
            <TextInput
              placeholder="example@gmail.com"
              label="Email address"
              size={"lg"}
              radius={8}
              className="tracking-[0.1em] w-[100%]"
              styles={{
                label: {
                  marginBottom: "18px",
                },
              }}
            ></TextInput>
            <Textarea
              placeholder="write your message here..."
              label="Subject"
              size={"lg"}
              radius={8}
              className="tracking-[0.1em] w-[100%]"
              styles={{
                label: {
                  marginBottom: "18px",
                },
              }}
            ></Textarea>
            <Button
              radius={8}
              size={"lg"}
              bg={"#BC6C25"}
              color={"#fff"}
              w={"20%"}
              className=" self-end"
            >
              Submit
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}
