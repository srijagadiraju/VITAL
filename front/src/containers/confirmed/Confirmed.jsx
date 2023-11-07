import "./confirmed.css";
import { Feature } from "../../components";
import PropTypes from "prop-types";

const Confirmed = ({ appointment }) => {
  return (
    <div className="vital__apt section__margin" id="howItWorks">
      <div className="vital__apt-heading">
        <h1 className="gradient__text">Your Appointment is Confirmed!</h1>
        <p>Review the details</p>
      </div>
      <div className="vital__apt-container">
        <Feature title="Meeting with" text={appointment.aptChosen.Doctor} />
        <Feature title="Department" text={appointment.aptChosen.Department} />
        <Feature title="Visit type" text={appointment.aptChosen.Visit} />
      </div>
      <div className="vital__apt-container">
        <Feature
          title="Time of Appointment"
          text={appointment.aptChosen.Time}
        />
        <Feature title="Message to the Doctor" text={appointment.message} />
        <Feature
          title="See something missing"
          text="Feel free to let us know if something is wrong"
        />
      </div>
    </div>
  );
};

export default Confirmed;

Confirmed.propTypes = {
  appointment: PropTypes.shape({
    aptChosen: PropTypes.shape({
      Doctor: PropTypes.string.isRequired,
      Department: PropTypes.string.isRequired,
      Visit: PropTypes.string.isRequired,
      Time: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    messaged: PropTypes.bool.isRequired,
  }).isRequired,
};
