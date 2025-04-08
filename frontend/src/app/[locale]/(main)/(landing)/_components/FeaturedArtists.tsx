import { Flex, Image } from "@mantine/core";
import React from "react";

const FeaturedArtists = () => {
  return (
    <div>
      <p className="text-2xl  p-10 pl-16">Featured Artworks</p>
      <Flex
        gap="md"
        justify="space-between"
        align="center"
        p="lg"
        className="overflow-hidden"
      >
        <Image
          src="/images/Rectangle 90.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
        <Image
          src="/images/Rectangle 87.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
        <Image
          src="/images/Rectangle 88.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
        <Image
          src="/images/Rectangle 89.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
        <Image
          src="/images/Rectangle 90.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
        <Image
          src="/images/Rectangle 87.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
        <Image
          src="/images/Rectangle 89.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
        <Image
          src="/images/Rectangle 88.png"
          alt="Artwork preview"
          w={600}
          h={250}
        />
      </Flex>
    </div>
  );
};

export default FeaturedArtists;
