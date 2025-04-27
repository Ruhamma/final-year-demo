import {
  Box,
  Card,
  Stack,
  Flex,
  UnstyledButton,
  ActionIcon,
  Image,
} from "@mantine/core";
import Link from "next/link";
import { IconShoppingCart, IconHeart } from "@tabler/icons-react";

export function Header() {
  return (
    <Card bg={"#fffcea"}>
      <Box className="container mx-auto">
        <Stack>
          <Flex justify="space-between" align="center">
            <Flex justify="space-between" align="center"gap={8}>
              <UnstyledButton className="hover:border-b-[1px] tracking-[0.2em]">AM</UnstyledButton>
              {"/"}
              <UnstyledButton className="hover:border-b-[1px] tracking-[0.2em]">EN</UnstyledButton>
            </Flex> 
            <Image  src={'/logo.png'} alt="Logo" width={72} height={43} />
            <Flex justify="space-between" align="center" py={10} gap={20}>
            <Link href={"#"} className="tracking-[0.3em] hover:border-b-[1px]">Sign Up</Link>
            <ActionIcon
              variant="transparent"
              size="lg"
              radius="xl"
              color="dark"
              mr={5}
            >
              <IconShoppingCart size={20} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              size="lg"
              radius="xl"
              color="dark"
              mr={5}
            >
              <IconHeart size={20} stroke={1.5} />
            </ActionIcon>
          </Flex>
          </Flex>
         <Flex align={'center'} justify={'space-between'}>
         <Flex gap={50}>
           <Link href={"#"} className=" tracking-[0.3em] hover:border-b-[1px]">Home</Link>
           <Link href={"/about-us"}  className=" tracking-[0.3em] hover:border-b-[1px]">About</Link>
           <Link href={"/contact-us"}  className=" tracking-[0.3em] hover:border-b-[1px]">Contact</Link>
         </Flex>
         <Flex gap={50}>
           <Link href={"#"} className=" tracking-[0.3em] hover:border-b-[1px]">Artworks</Link>
           <Link href={"#"} className=" tracking-[0.3em] hover:border-b-[1px]">Artist</Link>
         </Flex>
         </Flex>
        </Stack>
      </Box>
    </Card>
  );
}
