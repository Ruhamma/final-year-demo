'use client';
import { Box, Image, Text, Group, Button, Flex, Divider, Stack, Avatar, Accordion } from "@mantine/core";
import { IconBrandHipchat, IconMessageReport, IconSearch, IconShieldLock } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {
  return (
    <Box className=" sm:pt-16 py-10">
      <Image
        src={"/images/about-us-header.png"}
        alt="About Us"
        width={"100%"}
        className="mx-auto h-[60vh] relative"
      />
      <Box className="container mx-auto">
        <Box className="absolute top-[30%] w-[90%] sm:w-[60%] text-white py-10 rounded-lg shadow-md z-1000">
          <Text className="" fz={32} fw={700} mb={20}>
            Who are we?
          </Text>
          <Text mb={24} lh={1.8} fz={18}>
            Passionate about connecting art enthusiasts with exceptional works, we
            built Kuru as a curated online marketplace. Here, talented artists can
            showcase their creations and find dedicated collectors who appreciate
            their work. We take pride in offering a secure platform for
            transactions, ensuring peace of mind for both buyers and sellers. More
            than just a marketplace, we foster a vibrant community where artists
            and collectors can connect directly. So, whether you&apos;re searching
            for that perfect piece to add to your collection or eager to share
            your artistic vision with the world, KURU is your gateway to a world
            of artistic discovery.
          </Text>
          <Group>
            <Button bg={"#BC6C25"}>Buy Products</Button>
            <Button variant="outline" c={"white"}>
              Contact Us
            </Button>
          </Group>
        </Box>
        <Box>
            <Text className="text-center" fz={38}  mt={90}>
              We connect artists with buyers
            </Text>
            <Flex align={"center"} justify={"space-between"} mt={20}>
              <Stack w={'40%'}>
                <Box className="w-[50%] mx-auto">
                  <Image src={"/images/left-image.png"} alt="About Us" width={100} />
                </Box>
                <Flex
                direction={"column"}
                align={"center"}
                justify={"space-between"}
                mt={20}
                gap={32}
              >
                <Text fz={24} fw={700}>For Artists</Text>
                <Text>When you join kuru, you join our entire community for a friendlier, fairer world for artists. As well as reaching a global audience, you receive dedicated support at every step of the way.</Text>
                <Button bg={"#BC6C25"}>
                  Become a Seller
                </Button>
              </Flex>
              </Stack>
              <Divider />
              <Box className="border p-2">
                <Image src={"/logo.png"} alt="logo" width={100} />
              </Box>
              <Divider size={'md'}/>
              <Stack w={'30%'}>
              <Box className="w-[50%] mx-auto">
                <Image src={"/images/right-image.png"} alt="About Us" width={100} />
                </Box>
                <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
                mt={20}
                gap={32}
              >
                <Text fz={24} fw={700}>For Buyers</Text>
                <Text>We match you with original artwork we know you’ll love – and help you support artists at the same time. Directly connect with artists and find the perfect piece for you, no matter your taste or budget.</Text>
                <Button bg={"#BC6C25"}>
                
                  Shop Now
                </Button>
              </Flex>
              </Stack>
            </Flex>
</Box>
</Box>
            <Box  style={{
          backgroundImage: 'url(/images/Section2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '30vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          marginTop: '50px',
          
        }}>
          <Flex justify={"space-between"} align={"center"} className="container mx-auto px-2">
<Stack w={"30%"} className="text-center" align="center" justify="center">
  <Text fz={32}>Where Artists Meet Collectors: Discover Your Perfect Piece</Text>
  <Button w={'20%'} variant="outline" color="white" ><Link href={'/artworks'}>Explore</Link></Button>
</Stack>
<Flex gap={32}>
  <Stack className="border px-3 py-9 text-center" align="center" justify="center" w={'25%'}>
    <IconSearch size={50} color="white" />
    <Text fz={20}>Curated Selection</Text>
  </Stack>
  <Stack className="border px-3 py-9 text-center" align="center" justify="center" w={'25%'}>
    <IconBrandHipchat size={50} color="white" />
    <Text fz={20}>Direct Connection</Text>
  </Stack>
  <Stack className="border px-3 py-9 text-center" align="center" justify="center" w={'25%'}>
    <IconShieldLock size={50} color="white" />
    <Text fz={20}>Secure Transactions</Text>
  </Stack>
</Flex>
          </Flex>
          </Box>
          <Flex className="container mx-auto text-center mt-20 align-center justify-between" gap={32} mb={140}>
          <Box
      style={{ position: "relative", width: 440, height: 354 }}
    >
      {/* Background Image */}
      <Image
        src="/images/Large photo.png" // your first (big) image
        alt="Main Artwork"
        radius="md"
        width={540}
        height={454}
        style={{ objectFit: "cover" }}
      />

      {/* Smaller Image */}
      <Box
        style={{
          position: "absolute",
          bottom: -150,
          right: -90,
          backgroundColor: "white",
          borderRadius: 12,
          padding: 6,
        }}
      >
        <Image
          src="/images/Small photo.png" // your second (small) image
          alt="Overlay Artwork"
          radius="md"
          width={90}
          height={90}
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
    <Flex direction={"column"} align={"center"} justify={"center"}  w={"50%"}>
      <Flex align={"center"} gap={10} className="items-baseline">
        <Avatar bg={'#EED7B7'} >
          <IconMessageReport  color="#BC6C25"/>
        </Avatar>
        <Text>FAQ Question</Text>
      </Flex>
      <Text fz={40}>Frequently asked questions</Text>
      <Accordion variant="separated" multiple bg={"#fffcea"} mt={20} w={"100%"} mx={"auto"}>
        <Accordion.Item value="customization"  bg={"#fffcea"}>
          <Accordion.Control>How do I know the art on Kuru is authentic?</Accordion.Control>
          <Accordion.Panel>At Kuru, we prioritize authenticity. Every artwork listed undergoes a verification process to ensure it is genuine. We work with trusted artists, galleries, and certification providers to confirm the provenance of each piece. Additionally, buyers receive a certificate of authenticity with their purchase for added assurance.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="shipping"  bg={"#fffcea"}>
          <Accordion.Control>Is it safe to buy and sell art through Kuru?</Accordion.Control>
          <Accordion.Panel >Yes! Kuru provides a secure platform for both buyers and sellers. Transactions are protected through trusted payment gateways, and we offer escrow services for high-value purchases to ensure funds are only released once the artwork is delivered and verified. Our team also monitors activity to prevent fraud and maintain a trustworthy marketplace.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="returns"  bg={"#fffcea"}>
          <Accordion.Control>Can I connect with the artist directly?</Accordion.Control>
          <Accordion.Panel>Absolutely! Kuru encourages direct communication between artists and collectors. Many artists have profiles where you can message them, inquire about their work, or discuss commissions. We believe fostering these connections enhances the art-buying experience.</Accordion.Panel>
        </Accordion.Item>
        </Accordion>

    </Flex>
            </Flex>
            </Box>
      );
}
