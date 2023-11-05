import Confirmed from "../containers/confirmed/Confirmed";
import { Navbar, CTA } from "../components";

const AptConfirmation = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Confirmed />
      </div>
      <CTA
        title="Add a message!"
        text="Reach out to your doctor before your appointment for context"
        btnText="Add/Edit message"
      />
    </div>
  );
};

export default AptConfirmation;
