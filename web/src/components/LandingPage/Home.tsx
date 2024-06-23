import React from "react";
import About from "./About/About";
import Collaboration from "./Collaboration/Collaboration";
import Header from "./Header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Collaboration />
      <About />
    </>
  );
};

export default Home;
