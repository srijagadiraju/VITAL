import PropTypes from "prop-types";
import "./cta.css";

export default function CTA({ title, text, btnText, onClick, ariaLabelBtn }) {
  return (
    <div className="vital__cta section_padding section_margin" id="join">
      <div className="vital__cta-content">
        <p>{title}</p>
        <h4>{text}</h4>
      </div>
      <div className="vital__cta-btn">
        <button type="button" onClick={onClick} aria-label={ariaLabelBtn}>
          {btnText}
        </button>
      </div>
    </div>
  );
}

CTA.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  ariaLabelBtn: PropTypes.string,
};
