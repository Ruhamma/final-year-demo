"use client";

import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Container, Flex, Image } from "@mantine/core";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import "@mantine/carousel/styles.css"; // Ensure Mantine Carousel styles are applied

const Testimonials = () => {
  const t = useTranslations("common.Landing");
  const [activeSlide, setActiveSlide] = useState(1); // Middle one is active initially

const testimonials = [
  {
    name: "John Doe",
    text: t("testDescription"),
    image: "/images/Rectangle 20.png",
  },
  {
    name: "Jane Smith",
    text: t("testDescription"),
    image: "/images/Rectangle 20.png",
  },
  {
    name: "Mark Brown",
    text: t("testDescription"),
    image: "/images/Rectangle 20.png",
  },
];


  return (
    <div className="py-20">
      <Box className="p-6 md:p-10 md:pl-24">
        <p className="text-2xl md:text-4xl font-semibold text-center">
          {t("Testimonials")}
        </p>
        <p className="text-sm text-gray-500 font-light text-center">
          {t("Hear what our clients say about us")}
        </p>
      </Box>

      <Container>
        <Carousel
          slideSize="33.3333%"
          slideGap="md"
          align="center"
          loop
          withIndicators
          slideGap="md"
          onSlideChange={setActiveSlide}
          className="overflow-visible py-10"
        >
          {testimonials.map((testimonial, index) => (
            <CarouselSlide key={index}>
              <div
                className={`flex flex-col items-center transition-all duration-300 ${
                  index === activeSlide
                    ? "scale-105 opacity-100"
                    : "scale-90 opacity-50"
                }`}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md mb-4"
                />

                <div className="w-11/12 p-5 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <svg
                        key={starIndex}
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
                    {testimonial.text}
                  </p>
                  <p className="mt-4 font-semibold text-center">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Testimonials;
