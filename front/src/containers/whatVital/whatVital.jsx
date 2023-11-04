import React from "react";
import "./whatVital.css";
import { Feature } from "../../components";

const WhatVital = () => {
  return (
    <div className="vital__howItWorks section__margin" id="howItWorks">
      <div className="vital__howItWorks-heading">
        <h2 className="gradient__text">How It Works</h2>
        <p>Explore The Library</p>
      </div>
      <div className="vital__howItWorks-container">
        <Feature
          title="Chatbots"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
        />
        <Feature
          title="Chatbots"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
        />
        <Feature
          title="Chatbots"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. We so opinion friends me message as delight. Whole front do of plate heard oh ought."
        />
      </div>
    </div>
  );
};

export default WhatVital;
