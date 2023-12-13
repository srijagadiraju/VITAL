import { useNavigate, useLocation } from "react-router-dom";
import { LoginNav, CTA, Feature } from "../components";

const AptSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;

  // create new appointment for database
  const createAppointment = async (appointment) => {
    const newAppointment = {
      aptChosen: {
        Doctor: appointment.name,
        Department: appointment.department,
        Visit: appointment.visit,
        Time: appointment.time,
      },
      message: "Please specify your symptoms or any message for the doctor.",
      messaged: false,
    };

    try {
      const response = await fetch("/api/apt/add-apt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdAppointment = await response.json();
      return createdAppointment;
    } catch (error) {
      console.error("Error creating appointment:", error);
      return null;
    }
  };

  const handleConfirm = async () => {
    const createdAppointment = await createAppointment(appointment);

    if (createdAppointment && createdAppointment.aptId) {
      navigate(`/apt-confirmation/${createdAppointment.aptId}`);
    } else {
      console.log(
        "Failed to navigate to appointment confirmation. Please try again."
      );
    }
  };

  const handleGoBack = () => {
    navigate("/portal");
  };

  return (
    <div className="container">
      <div className="gradient__bg">
        <LoginNav />
        <div>
          <h1>Review your appointment details</h1>
          <div className="vital__apt-container">
            <Feature title="Meeting with" text={appointment.name} />
            <Feature title="Department" text={appointment.department} />
            <Feature title="Visit type" text={appointment.visit} />
            <Feature title="Visit time" text={appointment.time} />
          </div>
        </div>
      </div>
      <CTA
        title="If anything doesn't seem right!"
        text="Look at other appointments"
        btnText="Go Back"
        onClick={handleGoBack}
      />
      <CTA
        title="If everything looks good!"
        text="Confirm this appointment"
        btnText="Confirm"
        onClick={handleConfirm}
      />
    </div>
  );
};

export default AptSelection;
