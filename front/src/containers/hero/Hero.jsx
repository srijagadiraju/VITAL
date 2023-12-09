// import { useNavigate } from "react-router-dom";
// import "./hero.css";
// import health from "../../assets/health.jpg";

// const Hero = () => {
//   const navigate = useNavigate();

//   const navigateToRegister = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="vital__hero section__padding" id="hero">
//       <div className="vital__hero-content">
// <h1 className="gradient__text">
//   Your Health, Our Priority - Effortlessly Book Your Doctor
//   Appointments!
// </h1>

// <p>
//   Welcome to VITAL – the seamless connection between you and your
//   healthcare specialists. Our dedicated system empowers you to schedule,
//   manage, and prepare for your appointments with ease, ensuring
//   personalized care at every step.
// </p>

//         <div className="vital__hero-content__input">
//           <input type="email" placeholder="Your Email Address" />
//           <button type="button" onClick={navigateToRegister}>
//             Get Started
//           </button>
//         </div>
//       </div>
//       <div className="vital__hero-image">
//         <img src={health} alt="hero image" />
//       </div>
//     </div>
//   );
// };

// export default Hero;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import health from "../../assets/health.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const navigateToRegister = () => {
    navigate("/register", { state: { email } });
  };

  return (
    <div className="vital__hero section__padding" id="hero">
      <div className="vital__hero-content">
        <h1 className="gradient__text">
          Your Health, Our Priority - Effortlessly Book Your Doctor
          Appointments!
        </h1>

        <p>
          Welcome to VITAL - the seamless connection between you and your
          healthcare specialists. Our dedicated system empowers you to schedule,
          manage, and prepare for your appointments with ease, ensuring
          personalized care at every step.
        </p>

        <div className="vital__hero-content__input">
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={navigateToRegister}>
            Get Started
          </button>
        </div>
      </div>

      <div className="vital__hero-image">
        <img src={health} alt="hero image" />
      </div>
    </div>
  );
};

export default Hero;
