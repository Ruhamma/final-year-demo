import React from "react";
import Hero from "./_components/Hero";
import FeaturedArtists from "./_components/FeaturedArtists";
import About from "./_components/About";
import Discover from "./_components/Discover";
import Testimonials from "./_components/Testimonials";
import Curated from "./_components/Curated";

const Landing = () => {
  console.log("Landing page loaded");
  return (
    <>
      <Hero />
      <FeaturedArtists />
      <About />
      <Discover title="Discover Artworks" />
      <Testimonials title="Curators Picks" />
      <Curated />
    </>
  );
};

export default Landing;
