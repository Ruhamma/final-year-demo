"use client";
import {
  Box,
  Image,
  Text,
  Group,
  Button,
  Flex,
  Divider,
  Stack,
  Avatar,
  Accordion,
} from "@mantine/core";
import {
  IconBrandHipchat,
  IconMessageReport,
  IconSearch,
  IconShieldLock,
} from "@tabler/icons-react";
import Link from "next/link";
// import bg from "@/public/images/about-us-header.png";

export default function Page() {
  return (
    <Box className=" sm:pt-16 py-10 overflow-hidden">
      <Box className="container mx-auto bg-blue-500">
        <Box
          //style={{ backgroundImage: `url(${bg.src})` }}
          className="sm:w-[60%] text-white py-10 rounded-lg  z-10 px-4 sm:px-10 relative"
        >
          <Text className="" fz={32} fw={700} mb={20}>
            Who are we?
          </Text>
          <Text mb={24} lh={1.8} fz={18}>
            Passionate about connecting art enthusiasts with exceptional works,
            we built Kuru as a curated online marketplace. Here, talented
            artists can showcase their creations and find dedicated collectors
            who appreciate their work. We take pride in offering a secure
            platform for transactions, ensuring peace of mind for both buyers
            and sellers. More than just a marketplace, we foster a vibrant
            community where artists and collectors can connect directly. So,
            whether you&apos;re searching for that perfect piece to add to your
            collection or eager to share your artistic vision with the world,
            KURU is your gateway to a world of artistic discovery.
          </Text>
          <Group className="flex-wrap">
            <Button bg={"#BC6C25"}>Buy Products</Button>
            <Button variant="outline" c={"white"}>
              Contact Us
            </Button>
          </Group>

          {/* <Image
        src={"/images/about-us-header.png"}
        alt="About Us"
        width={"100%"}
        className="mx-auto h-full object-cover absolute top-0 left-0"
      /> */}
        </Box>
        <Box mt={280}>
          <Text
            className="text-center text-2xl sm:text-3xl font-semibold"
            mt={90}
          >
            We connect artists with buyers
          </Text>
          <Flex
            align="center"
            justify="center"
            direction={{ base: "column", md: "row" }}
            mt={40}
            gap={40}
            className="px-4"
          >
            <Stack w={{ base: "100%", md: "40%" }}>
              <Box className="w-[50%] mx-auto">
                <Image
                  src={"/images/left-image.png"}
                  alt="About Us"
                  width={100}
                />
              </Box>
              <Flex direction="column" align="center" gap={16}>
                <Text fz={24} fw={700}>
                  For Artists
                </Text>
                <Text className="text-center">
                  When you join kuru, you join our entire community for a
                  friendlier, fairer world for artists. As well as reaching a
                  global audience, you receive dedicated support at every step
                  of the way.
                </Text>
                <Button bg={"#BC6C25"}>Become a Seller</Button>
              </Flex>
            </Stack>
            <Divider orientation="vertical" className="hidden md:block" />
            <Box className="border p-2 hidden md:block">
              <Image src="/logo.png" alt="logo" width={100} />
            </Box>
            <Divider orientation="vertical" className="hidden md:block" />

            <Stack w={{ base: "100%", md: "30%" }}>
              <Box className="w-[50%] mx-auto">
                <Image
                  src={"/images/right-image.png"}
                  alt="About Us"
                  width={100}
                />
              </Box>
              <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
                mt={20}
                gap={32}
              >
                <Text fz={24} fw={700}>
                  For Buyers
                </Text>
                <Text className="text-center">
                  We match you with original artwork we know you’ll love – and
                  help you support artists at the same time. Directly connect
                  with artists and find the perfect piece for you, no matter
                  your taste or budget.
                </Text>
                <Button bg={"#BC6C25"}>Shop Now</Button>
              </Flex>
            </Stack>
          </Flex>
        </Box>
      </Box>
      <Box
        style={{
          backgroundImage: "url(/images/Section2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // height: "30vh",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          marginTop: "50px",
        }}
        className="py-10"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          align={"center"}
          className="container mx-auto px-2 gap-y-8"
        >
          <Stack
            w={{ base: "100%", md: "30%" }}
            className="text-center"
            align="center"
            justify="center"
            spacing="md"
          >
            <Text fz={{ base: 24, md: 32 }} className="font-semibold">
              Where Artists Meet Collectors: Discover Your Perfect Piece
            </Text>
            <Button w="fit-content" variant="outline" color="white">
              <Link href="/artworks">Explore</Link>
            </Button>
          </Stack>

          <Flex gap={32} className="flex justify-center ">
            <Stack
              className="border px-3 py-9 text-center"
              align="center"
              justify="center"
              w={"25%"}
            >
              <IconSearch size={50} color="white" />
              <Text fz={20}>Curated Selection</Text>
            </Stack>
            <Stack
              className="border px-3 py-9 text-center"
              align="center"
              justify="center"
              w={"25%"}
            >
              <IconBrandHipchat size={50} color="white" />
              <Text fz={20}>Direct Connection</Text>
            </Stack>
            <Stack
              className="border px-3 py-9 text-center"
              align="center"
              justify="center"
              w={"25%"}
            >
              <IconShieldLock size={50} color="white" />
              <Text fz={20}>Secure Transactions</Text>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        className="container mx-auto text-center mt-20"
        align="center"
        justify="space-between"
        gap={32}
        mb={140}
      >
        {/* Image Section */}
        <Box
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 440,
            height: "auto",
            margin: "0 auto",
          }}
          className="hidden md:flex"
        >
          {/* Background Image */}
          <Image
            src="/images/Large photo.png"
            alt="Main Artwork"
            radius="md"
            width={540}
            height={454}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
            }}
          />

          {/* Overlay Smaller Image */}
          <Box
            style={{
              position: "absolute",
              bottom: -45,
              right: -30,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 6,
            }}
          >
            <Image
              src="/images/Small photo.png"
              alt="Overlay Artwork"
              radius="md"
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>

        {/* Text + Accordion Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          w={{ base: "100%", md: "50%" }}
          mt={{ base: 10, md: 0 }}
        >
          <Flex align="center" gap={10} className="items-baseline mb-4">
            <Avatar bg="#EED7B7">
              <IconMessageReport color="#BC6C25" />
            </Avatar>
            <Text>FAQ Question</Text>
          </Flex>
          <Text fz={{ base: 28, md: 40 }} className="mb-6">
            Frequently asked questions
          </Text>

          <Accordion variant="separated" multiple bg="#fffcea" w="100%" mt={20}>
            <Accordion.Item value="customization" bg="#fffcea">
              <Accordion.Control>
                How do I know the art on Kuru is authentic?
              </Accordion.Control>
              <Accordion.Panel className="text-left">
                At Kuru, we prioritize authenticity. Every artwork listed
                undergoes a verification process to ensure it is genuine...
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="shipping" bg="#fffcea">
              <Accordion.Control>
                Is it safe to buy and sell art through Kuru?
              </Accordion.Control>
              <Accordion.Panel className="text-left">
                Yes! Kuru provides a secure platform for both buyers and
                sellers...
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="returns" bg="#fffcea">
              <Accordion.Control>
                Can I connect with the artist directly?
              </Accordion.Control>
              <Accordion.Panel className="text-left">
                Absolutely! Kuru encourages direct communication between artists
                and collectors...
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Flex>
      </Flex>
    </Box>
  );
}
