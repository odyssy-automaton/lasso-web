import React from "react";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";

// OpenLaw APIClient: https://docs.openlaw.io/api-client/#authentication
//  - used to fetch geo data in our `Address` field type
//  - run against your own private OpenLaw instance: 'https://[YOUR.INSTANCE.URL]';
const apiClient = new APIClient("https://app.openlaw.io");
// see tip below about authentication
// apiClient.login("[YOUR_OPENLAW_EMAIL]", "[YOUR_OPENLAW_PASSWORD]");

const { compiledTemplate } = Openlaw.compileTemplate(
  "**Name**: [[First Name]] [[Last Name]]"
);
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

const Mao = () => (
  <OpenLawForm
    apiClient={apiClient}
    executionResult={executionResult}
    parameters={parameters}
    onChangeFunction={onChange}
    openLaw={Openlaw}
    variables={variables}
  />
);

export default Mao;
