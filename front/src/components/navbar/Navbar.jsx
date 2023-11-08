import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/vital2.svg";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToJoin = () => {
    navigate("/join");
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
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Home
            </a>
          </p>
          <p>
            <a href="#howItWorks">How it works</a>
          </p>
          <p>
            <a href="#join">Join us</a>
          </p>
        </div>
      </div>
      <div className="vital__navbar-sign">
        <p>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/join");
            }}
            style={{ cursor: "pointer" }}
          >
            Sign In
          </a>
        </p>
        <button type="button" onClick={navigateToRegister}>
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
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#howItWorks">How it works</a>
              </p>
              <p>
                <a href="#join">Join us</a>
              </p>
            </div>
            <div className="vital__navbar-menu_container-links-sign">
              <a href="#" onClick={navigateToJoin}>
                Sign In
              </a>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
