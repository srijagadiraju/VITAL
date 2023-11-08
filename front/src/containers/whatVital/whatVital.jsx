import "./whatVital.css";
import { Feature } from "../../components";

const WhatVital = () => {
  return (
    <div className="vital__howItWorks section__margin" id="howItWorks">
      <div className="vital__howItWorks-heading">
        <h2 className="gradient__text">How It Works</h2>
        <p>Simple steps to a healthier future</p>
      </div>
      <div className="vital__howItWorks-container">
        <Feature
          title="Find Your Specialist"
          text="Choose from a wide range of specialists using our intuitive search feature. Filter by department, availability, and location to find the perfect match for your healthcare needs."
        />
        <Feature
          title="Manage Appointments"
          text="Easily book and reschedule appointments according to your convenience. Receive confirmation and reminders so you never miss a visit to your healthcare provider."
        />
        <Feature
          title="Communicate & Track"
          text="Send pre-visit messages detailing your symptoms or concerns, and keep track of your doctor’s recommendations and health progress all in one secure place."
        />
      </div>
    </div>
  );
};

export default WhatVital;
