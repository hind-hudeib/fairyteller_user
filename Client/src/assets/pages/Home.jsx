import React from "react";
import HeroSlider from "../pages/HeroSlider";
import Recommended from "../pages/Recommended";
import { CarouselSlide } from "./CarouselSlide";
import QuotesSection from "./QuotesSection";
import Loader from "../component/Loader";
import StoriesSlider from "./StoriesSlider";
import Features from "./Features";
import HowItWorkSection from "./HowItWorkSection";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <Features />
      <Recommended />
      <StoriesSlider />
      <HowItWorkSection />
      <QuotesSection />
    </>
  );
};

export default Home;
