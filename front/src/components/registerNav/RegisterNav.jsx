import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./registerNav.css";
import logo from "../../assets/vital.svg";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToJoin = () => {
    navigate("/join");
  };

  const handleSignInKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateToJoin();
    }
  };

  return (
    <div className="vital__navbar">
      <div className="vital__navbar-links">
        <div className="vital__navbar-links_logo">
          <img src={logo} alt="vital logo" />
        </div>
        <div className="vital__navbar-links_container">
          <p>
            <a
              tabIndex="0"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome();
              }}
              style={{ cursor: "pointer" }}
            >
              Home
            </a>
          </p>
        </div>
      </div>
      <div className="vital__navbar-sign">
        <p>
          <a
            tabIndex="0"
            onClick={(e) => {
              e.preventDefault();
              navigateToJoin();
            }}
            onKeyDown={handleSignInKeyDown} // Handle Enter key
            style={{ cursor: "pointer" }}
          >
            Sign In
          </a>
        </p>
        <button
          type="button"
          tabIndex="0"
          onClick={navigateToRegister}
          className="signup-button"
        >
          Sign up
        </button>
      </div>
      <div className="vital__navbar-menu">
        {openMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setOpenMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setOpenMenu(true)}
          />
        )}
        {openMenu && (
          <div className="vital__navbar-menu_container scale-up-center">
            <div className="vital__navbar-menu_container-links">
              <p>
                <a href="#home" tabIndex="0">
                  Home
                </a>
              </p>
            </div>
            <div className="vital__navbar-menu_container-links-sign">
              <a href="#" tabIndex="0" onClick={navigateToJoin}>
                Sign In
              </a>
              <button type="button" tabIndex="0" className="signup-button">
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
