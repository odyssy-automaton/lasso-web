import React from 'react';
import Loader from '../../assets/loader.gif';

const Loading = () => (
  <div className="Loading" style={{ backgroundImage: "url(" + Loader + ")" }}>
    <h5>Processing ...</h5>
  </div>
);

export default Loading;