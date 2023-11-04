import React from "react";
import PropTypes from "prop-types";
import "./feature.css";

const Feature = ({ title, text }) => {
  return (
    <div className="vital__features-container__feature">
      <div className="vital__features-container__feature-title">
        <div />
        <h4>{title}</h4>
      </div>
      <div className="vital__features-container__feature-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Feature;

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
