import React from "react";
import Hero from "./_components/Hero";
import FeaturedArtists from "./_components/FeaturedArtists";
import About from "./_components/About";
import Discover from "./_components/Discover";
import Testimonials from "./_components/Testimonials";
import Curated from "./_components/Curated";
import { useTranslations } from "next-intl";

const Landing = () => {
  console.log("Landing page loaded");
  const t = useTranslations("common.Landing");
  return (
    <>
      <Hero />
      <FeaturedArtists />
      <About />
      <Discover title={t('DiscoverArtworks')}/>
      <Testimonials title={t('CuratorsPicks')} />
      <Curated />
    </>
  );
};

export default Landing;
