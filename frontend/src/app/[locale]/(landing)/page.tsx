import React from "react";
import Hero from "./_components/Hero";
import FeaturedArtists from "./_components/FeaturedArtists";
import About from "./_components/About";
import Discover from "./_components/Discover";

const Landing = () => {
  console.log("Landing page loaded");
  return (
    <>
      <Hero />
      <FeaturedArtists />
      <About />
      <Discover />
    </>
  );
};

export default Landing;
