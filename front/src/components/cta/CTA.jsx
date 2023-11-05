import PropTypes from "prop-types";
import "./cta.css";

const CTA = ({ title, text, btnText }) => {
  return (
    <div className="vital__cta section_padding section_margin" id="join">
      <div className="vital__cta-content">
        <p>{title}</p>
        <h4>{text}</h4>
      </div>
      <div className="vital__cta-btn">
        <button type="button">{btnText}</button>
      </div>
    </div>
  );
};

export default CTA;

CTA.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};
