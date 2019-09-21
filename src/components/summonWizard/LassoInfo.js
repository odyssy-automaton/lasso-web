import { useFormikContext } from "formik";
import React from "react";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";

const apiClient = new APIClient("https://app.openlaw.io");

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

const LassoInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>LASSO Info</h3>
      <h4>Let's get some legal info!</h4>

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
};

export default LassoInfo;
