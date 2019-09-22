import { FastField, useFormikContext } from "formik";
import React from "react";

function SignAgreement() {
  const { errors, touched } = useFormikContext();

  return (
    <div className="Step">
      <div>
        <h3>Sign the Operating Agreement</h3>
        <div>Some text yo.</div>
      </div>
    </div>
  );
}

export default SignAgreement;
