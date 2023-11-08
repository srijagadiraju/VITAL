import { Hero, WhatVital } from "../containers";
import { Navbar, CTA } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

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
        onClick={navigateToRegister}
      />
    </div>
  );
};

export default Home;
