import React from "react";
import About from "../components/LandingPage/About/About";
import Collaboration from "../components/LandingPage/Collaboration/Collaboration";
import Explications from "../components/LandingPage/Explications/Explications";
import Header from "../components/LandingPage/Header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Explications />
      <Collaboration />
      <About />
    </>
  );
};

export default Home;
