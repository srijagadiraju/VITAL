import { Hero, WhatVital } from "../containers";
import { Navbar, CTA } from "../components";

const Home = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Hero />
      </div>
      <WhatVital />
      <CTA />
    </div>
  );
};

export default Home;
