import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Container, Flex, Image } from "@mantine/core";
import { useTranslations } from "next-intl";
import React from "react";

const Curated = () => {
  const t = useTranslations('common.Landing');
  return (
    <div className="py-20">
      <Box className="p-10 pl-24">
        <p className="text-4xl font-semibold text-center ">{t('Testimonials')}</p>
        <p className="text-sm text-gray-500 font-light text-center">
         {t('Hear what our clients say about us')}
        </p>
      </Box>
      <Container>
        <Flex justify={"center"} align="center" gap="10" className="mb-10">
          <Image
            alt="Curated Image"
            src="/images/Rectangle 20.png"
            className="mt-20"
          />
          <Image alt="Curated Image" src="/images/Rectangle 20.png" />
          <Image
            alt="Curated Image"
            src="/images/Rectangle 20.png"
            className="mt-20"
          />
        </Flex>
        <Carousel slideSize="100%" slideGap="md" loop withIndicators>
          <CarouselSlide>
            <div className="flex flex-col items-center justify-center ">
              <div className="w-1/2 p-5  rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-light text-center">
                 {t('testDescription')}
                </p>

                <p className="mt-4 font-semibold text-center">{t('johnDoe')}</p>
              </div>
            </div>
          </CarouselSlide>
        </Carousel>
      </Container>
    </div>
  );
};

export default Curated;
