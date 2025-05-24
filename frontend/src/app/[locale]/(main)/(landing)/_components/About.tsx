'use client'
import { Box, Button, Container, Flex, Image } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

const About = () => {
  const router = useRouter()
  const t = useTranslations("common.Landing");
  return (
    <Container className="my-20">
      <Flex
        className="gap-10 flex-col lg:flex-row"
        align="center"
        justify="center"
      >
        <Box className="w-full lg:w-1/2 px-4">
          <Flex direction="column" gap="md" mb="lg">
            <p className="text-2xl sm:text-3xl">{t("AboutUs")}</p>
            <p className="text-sm font-light">{t("about")}</p>
          </Flex>
          <Button onClick={()=> router.push('/about-us')}>{t("ReadMore")}</Button>
        </Box>
        <Box className="w-full lg:w-1/2 px-4">
          <Image
            src="/images/Rectangle 19.png"
            alt="Artwork preview"
            className="w-full h-auto object-cover rounded"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default About;
