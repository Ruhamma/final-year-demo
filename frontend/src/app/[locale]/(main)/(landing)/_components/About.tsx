import { Box, Button, Container, Flex, Image } from "@mantine/core";
import { useTranslations } from "next-intl";
import React from "react";

const About = () => {
  const t = useTranslations("common.Landing");
  return (
    <Container className="my-20">
      <Flex className="gap-10" align={"center"} justify="center">
        <Box className="w-1/2">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-3xl">{t('AboutUs')}</p>
            <p className="text-sm font-light">
             {t('about')}
            </p>
          </Flex>
          <Button>{t('ReadMore')}</Button>
        </Box>
        <Box className="w-1/2">
          <Image src="/images/Rectangle 19.png" alt="Artwork preview" />
        </Box>
      </Flex>
    </Container>
  );
};

export default About;
