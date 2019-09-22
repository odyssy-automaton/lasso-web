import { useFormikContext } from "formik";
import React from "react";
import Web3 from "web3";
import { useWeb3Context } from "web3-react";

const web3 = new Web3(Web3.givenProvider);

const signAgreement = context => {
  web3.eth.personal.sign(
    "Please sign the Operating Agreement",
    context.account
  );
};

function SignAgreement() {
  const { errors, touched } = useFormikContext();
  const context = useWeb3Context();

  return (
    <div className="Step">
      <div>
        <h3>Sign the Operating Agreement</h3>
        <button onClick={() => signAgreement(context)}>
          Sign Operating Agreement
        </button>
      </div>
    </div>
  );
}

export default SignAgreement;
