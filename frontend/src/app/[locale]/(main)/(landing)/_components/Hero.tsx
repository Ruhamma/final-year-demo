import { Box, Button, Container, Flex, Image } from "@mantine/core";
import React from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
   const t = useTranslations('common.Landing.Hero');
  return (
    <Container className="mt-10">
      <Flex className="gap-10 flex-col lg:flex-row" align={"center"} justify="center">
        <Box className="w-full lg:w-1/2">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-xs opacity-50 font-light ">
             {t('Title')}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {t('Subtitle')}
            </p>
            <p className="text-sm font-light">
             {t('Description')}
            </p>
          </Flex>
          <Button>{t('ViewArtwork')}</Button>
        </Box>
        <Box className="w-full lg:w-1/2">
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
