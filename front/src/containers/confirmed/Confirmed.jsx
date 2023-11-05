import "./confirmed.css";
import { Feature } from "../../components";

const Confirmed = () => {
  const appointment = {
    id: 1,
    userName: "bob",
    userid: 23,
    aptChosen: {
      "Doctor's Name": "Dr. Smith",
      Department: "Cardiology",
      Visit: "In-person",
      "Time of Appointment": "9:00 AM",
    },
    message: "I am feeling this type of pain ...",
    messaged: false,
  };

  return (
    <div className="vital__apt section__margin" id="howItWorks">
      <div className="vital__apt-heading">
        <h1 className="gradient__text">Your Appointment is Confirmed!</h1>
        <p>Review the details</p>
      </div>
      <div className="vital__apt-container">
        <Feature
          title="Meeting with"
          text={appointment.aptChosen["Doctor's Name"]}
        />
        <Feature title="Department" text={appointment.aptChosen.Department} />
        <Feature title="Visit type" text={appointment.aptChosen.Visit} />
      </div>
      <div className="vital__apt-container">
        <Feature
          title="Time of Appointment"
          text={appointment.aptChosen["Time of Appointment"]}
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
