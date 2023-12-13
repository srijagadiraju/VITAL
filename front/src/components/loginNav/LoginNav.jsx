import { useNavigate } from "react-router-dom";
import "./loginNav.css";
import vital from "../../assets/vital.svg";

const LoginNav = () => {
  const navigate = useNavigate();

  const navigateToPortal = () => {
    navigate("/portal");
  };

  const navigateToNotes = () => {
    navigate("/notes");
  };

  const signOut = () => {
    navigate("/");
  };

  return (
    <div className="vital__navbar">
      <div className="vital__navbar-links">
        <div className="vital__navbar-links_logo">
          <img src={vital} alt="vital logo" />
        </div>
        <div className="vital__navbar-links_container">
          <p>
            <a href="#portal" onClick={navigateToPortal}>
              Portal
            </a>
          </p>
          <p>
            <a href="#notes" onClick={navigateToNotes}>
              Notes
            </a>
          </p>
        </div>
      </div>
      <div className="vital__navbar-sign">
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default LoginNav;
