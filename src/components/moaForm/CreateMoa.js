import React from "react";
import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import MoaTemplate from "./MoaTemplate";
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

const { compiledTemplate } = Openlaw.compileTemplate(MoaTemplate);
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

  // TODO: Grab params and upload draft from those params.
  // const params = {
  //   templateId:
  //     "29f529e7f819fa2beb1c4a8bf258a15cfe46dad4f91538ebedbd1fb7299bbc55",
  //   title: "Advisor Agreement",
  //   text:
  //     'This Advisor Agreement is entered into between [[Company Name: Text]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services"). {{No Services "Do you want to limit the advisor\'s services?"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field "What field should the advisor not participate in?"]].}}\n\n**COMPANY:**\n[[Company Signatory Email: Identity | Signature]]\n\n___________________\nName: [[Company Signatory]]\nAddress: [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity | Signature]]\n\n___________________\nName: [[Advisor Name]]\nAddress: [[Advisor Address: Address]]\n',
  //   creator: "8f26427b-0853-469b-a4f1-132190b7373e",
  //   parameters: {
  //     "Company Name": "ABC, Inc.",
  //     "Company Signatory Email":
  //       '{"id":{"id":"8f26427b-0853-469b-a4f1-132190b7373e"},"email":"openlawuser+1@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+1@gmail.com"}]}',
  //     "Advisor Email":
  //       '{"id":{"id":"38e0eb6b-0d52-4fd8-a77d-19686fd3843a"},"email":"openlawuser+2@gmail.com","identifiers":[{"identityProviderId":"openlaw","identifier":"openlawuser+2@gmail.com"}]}'
  //   },
  //   overriddenParagraphs: {},
  //   agreements: {},
  //   readonlyEmails: [],
  //   editEmails: [],
  //   draftId: ""
  // };
  // apiClient.uploadDraft(params);
  props.history.push(`/dao/${props.address}`);
};

const CreateMoa = props => {
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

export default withRouter(CreateMoa);
