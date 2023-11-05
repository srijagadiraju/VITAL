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
      <CTA
        title="Join us today!"
        text="Sign up and start exploring your options"
        btnText="Get started"
      />
    </div>
  );
};

export default Home;
