import React from "react";
import { Link } from 'react-router-dom';

const SummonButton = (props) => {
  console.log(props)

  return (
      <Link to={`summon`}> 
        <button>Summon a DAO</button>
      </Link>
  );
};

export default SummonButton;
