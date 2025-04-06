import { Box, Button, Container, Flex, Image } from "@mantine/core";
import React from "react";

const Hero = () => {
  return (
    <Container className="mt-10">
      <Flex className="gap-10" align={"center"} justify="center">
        <Box className="w-1/2">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-xs opacity-50 font-light ">
              Discover the world of art
            </p>
            <p className="text-4xl font-bold">Change the way art is valued</p>
            <p className="text-sm font-light">
              Paint your world with a vibrant collection of original paintings.
              Explore captivating landscapes, intimate portraits, and everything
              in between. Support talented artists and own a piece of their
              story. Whether you seek a specific style, a captivating color
              palette, or a theme that resonates with you, the perfect painting
              awaits to be discovered.
            </p>
          </Flex>
          <Button>View artworks</Button>
        </Box>
        <Box className="w-1/2">
          <Flex gap="md" mb="lg">
            <Flex direction="column" gap="md" mb="lg" mt="xl">
              <Image
                src="/images/image 2.png"
                alt="Artwork preview"
                w={600}
                h={250}
              />
              <Image
                src="/images/image 3.png"
                alt="Artwork preview"
                w={600}
                h={250}
              />
            </Flex>
            <Flex direction="column" gap="md" mb="lg">
              <Image
                src="/images/image 4.png"
                alt="Artwork preview"
                w={600}
                h={250}
              />
              <Image
                src="/images/image 6.png"
                alt="Artwork preview"
                w={600}
                h={250}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Hero;
