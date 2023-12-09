import "./footer.css";
import vital from "../../assets/vital.svg";

const Footer = () => {
  return (
    <div className="vital__footer section__padding">
      <div className="vital__footer-links">
        <div className="vital__footer-links_logo">
          <img src={vital} alt="vital logo" />
        </div>
        <div className="vital__footer-links_contact">
          <h4>Socials</h4>
          <p>
            <a href="https://twitter.com/">Twitter</a>
          </p>
          <p>
            <a href="https://www.linkedin.com/">LinkedIn</a>
          </p>
          <p>
            <a href="https://www.facebook.com/">Facebook</a>
          </p>
        </div>
        <div className="vital__footer-links_contact">
          <h4>Get in touch</h4>
          <p>600 California St, SF, CA</p>
          <p>800-800800</p>
          <p>info@vital.com</p>
        </div>
      </div>
      <div className="vital__footer-copyright">
        <p>@2023 VITAL. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
