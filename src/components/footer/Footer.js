import React from "react";
import { Link } from "react-router-dom";
import ActivateButton from "../../components/activateButton/ActivateButton";

import "./Footer.scss";
import Brand from "../../assets/logo.png";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="Row">
        <Link to={`/`} className="Brand" href="/" alt="Lasso Home">
          <h1>Lasso</h1>
        </Link>
        <a href='https://t.me/joinchat/IJqu9xOfqsnAzdHNGJz2EA'>Join the Telegram Group</a>
      </div>
    </div>
  );
};

export default Footer;
