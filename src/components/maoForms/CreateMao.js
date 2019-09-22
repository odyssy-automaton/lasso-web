import React from "react";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import MaoTemplate from "./MaoTemplate";
import Web3 from "web3";
import { useWeb3Context } from "web3-react";
import { withRouter } from "react-router-dom";

const web3 = new Web3(Web3.givenProvider);

// OpenLaw APIClient: https://docs.openlaw.io/api-client/#authentication
//  - used to fetch geo data in our `Address` field type
//  - run against your own private OpenLaw instance: 'https://[YOUR.INSTANCE.URL]';
const apiClient = new APIClient("https://app.openlaw.io");
// see tip below about authentication
apiClient.login(
  process.env.REACT_APP_OPENLAW_USER,
  process.env.REACT_APP_OPENLAW_PASS
);

const { compiledTemplate } = Openlaw.compileTemplate(MaoTemplate);
const { executionResult, errorMessage } = Openlaw.execute(
  compiledTemplate,
  {},
  {},
  {}
);
const variables = Openlaw.getExecutedVariables(executionResult, {});
const parameters = {};

if (errorMessage) {
  console.error("Openlaw Execution Error:", errorMessage);
}

const onChange = (key, value, validationData) =>
  console.log("KEY:", key, "VALUE:", value, "VALIDATION:", validationData);

const signAgreement = async (context, props) => {
  await web3.eth.personal.sign(
    "Please sign the Operating Agreement",
    context.account
  );
  props.history.push(`/dao/${props.address}`);
};

const CreateMao = props => {
  const context = useWeb3Context();
  return (
    <div className="Form">
      <h3>Create your Operating Agreement</h3>
      <p>
        See the template of the agreement on{" "}
        <a href="https://app.openlaw.io/template/LassoDAO">OpenLaw</a>.
      </p>
      <OpenLawForm
        apiClient={apiClient}
        executionResult={executionResult}
        parameters={parameters}
        onChangeFunction={onChange}
        openLaw={Openlaw}
        variables={variables}
      />
      <button onClick={() => signAgreement(context, props)}>
        Sign Operating Agreement
      </button>
    </div>
  );
};

export default withRouter(CreateMao);
