import { Box, Button, Container, Flex, Image } from "@mantine/core";
import React from "react";

const About = () => {
  return (
    <Container className="my-20">
      <Flex className="gap-10" align={"center"} justify="center">
        <Box className="w-1/2">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-3xl">About us</p>
            <p className="text-sm font-light">
              Paint your world with a vibrant collection of original paintings.
              Explore captivating landscapes, intimate portraits, and everything
              in between. Support talented artists and own a piece of their
              story. Whether you seek a specific style, a captivating color
              palette, or a theme that resonates with you, the perfect painting
              awaits to be discovered.
            </p>
          </Flex>
          <Button>Read more</Button>
        </Box>
        <Box className="w-1/2">
          <Image src="/images/Rectangle 19.png" alt="Artwork preview" />
        </Box>
      </Flex>
    </Container>
  );
};

export default About;
