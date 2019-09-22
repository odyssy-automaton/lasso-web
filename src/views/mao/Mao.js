import React from "react";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";

// OpenLaw APIClient: https://docs.openlaw.io/api-client/#authentication
//  - used to fetch geo data in our `Address` field type
//  - run against your own private OpenLaw instance: 'https://[YOUR.INSTANCE.URL]';
const apiClient = new APIClient("https://app.openlaw.io");
// see tip below about authentication
apiClient.login("tommy.cox@protonmail.com", "INSERT_PASSWORD_HERE");

apiClient.getTemplate('LassoDAO').then(result => {
  const { compiledTemplate } = Openlaw.compileTemplate(
    result
  );
  const { executionResult, errorMessage } = Openlaw.execute(
    compiledTemplate,
    {},
    {},
    {}
  );
  this.setState({
    executionResult,
    variables: Openlaw.getExecutedVariables(executionResult, {}),
    parameters: {}
  });

  if (errorMessage) {
    console.error("Openlaw Execution Error:", errorMessage);
  }

  // const onChange = (key, value, validationData) =>
  //   console.log("KEY:", key, "VALUE:", value, "VALIDATION:", validationData);
  
})

const Mao = () => (
  <OpenLawForm
    apiClient={apiClient}
    executionResult={this.state.executionResult}
    parameters={this.state.parameters}
    // onChangeFunction={onChange}
    openLaw={Openlaw}
    variables={this.state.variables}
  />
);

export default Mao;
