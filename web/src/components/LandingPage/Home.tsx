import React from "react";
import About from "./About/About";
import Collaboration from "./Collaboration/Collaboration";
import Explications from "./Explications/Explications";
import Header from "./Header/Header";

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
