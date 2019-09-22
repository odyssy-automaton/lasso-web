import React from "react";
import { Link, withRouter } from "react-router-dom";
import ActivateButton from "../../components/activateButton/ActivateButton";

import "./Footer.scss";
import Brand from "../../assets/logo.png";
const Footer = withRouter(({ ...props }) => {
  const { location } = props;
  console.log("location", location);

  const route = location.pathname.split("/")[1];
  const hide = route === "apply" || route === "summon";
  if (hide) {
    return null;
  }

  return (
    <div className="Footer">
      <div className="Row">
        <Link to={`/`} className="Brand" href="/" alt="Lasso Home">
          <h1>Lasso</h1>
        </Link>
        <a href="https://odyssy.io" target="_blank" rel="noopener noreferrer">
          Built with 🌶️ by Odyssy
        </a>
        <a
          href="https://t.me/joinchat/IJqu9xOfqsnAzdHNGJz2EA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Telegram Group
        </a>
      </div>
    </div>
  );
});

export default Footer;
