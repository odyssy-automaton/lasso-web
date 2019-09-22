import React from "react";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import MaoTemplate from "./MaoTemplate";

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

const CreateMao = () => (
  <div className="Form">
    <OpenLawForm
      apiClient={apiClient}
      executionResult={executionResult}
      parameters={parameters}
      onChangeFunction={onChange}
      openLaw={Openlaw}
      variables={variables}
    />
  </div>
);

export default CreateMao;
