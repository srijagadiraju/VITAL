import React from "react";
import "./hero.css";
import ai from "../../../assets/ai.png";

const Hero = () => {
  return (
    <div className="vital__hero section__padding" id="hero">
      <div className="vital__hero-content">
        <h1 className="gradient__text">
          Let’s Build Something amazing with GPT-3 OpenAI
        </h1>

        <p>
          Yet bed any for travelling assistance indulgence unpleasing. Not
          thoughts all exercise blessing. Indulgence way everything joy
          alteration boisterous the attachment. Party we years to order allow
          asked of.
        </p>

        <div className="vital__hero-content__input">
          <input type="email" placeholder="Your Email Address" />
          <button type="button">Get Started</button>
        </div>
      </div>
      <div className="vital__hero-image">
        <img src={ai} alt="hero image" />
      </div>
    </div>
  );
};

export default Hero;
