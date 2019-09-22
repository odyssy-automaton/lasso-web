import React from "react";
import { Link } from "react-router-dom";
import ActivateButton from "../../components/activateButton/ActivateButton";

import "./TopNav.scss";
import Brand from "../../assets/logo.png";
const TopNav = () => {
  return (
    <header className="TopNav">
      <Link to={`/`} className="Brand" href="/" alt="Lasso Home">
        <h1>Lasso</h1>
      </Link>
      <ActivateButton />
    </header>
  );
};

export default TopNav;
