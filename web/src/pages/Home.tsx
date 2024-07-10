import React from "react";
import AboutUs from "../components/LandingPage/AboutUs/AboutUs";
import Features from "../components/LandingPage/Features/Features";
import Explanations from "../components/LandingPage/Explanations/Explanations";
import Header from "../components/LandingPage/Header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Explanations />
      <Features />
      <AboutUs />
    </>
  );
};

export default Home;
