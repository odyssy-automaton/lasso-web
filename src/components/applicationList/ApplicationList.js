import React from "react";

import "./ApplicationList.scss";

import ApplicantItem from "../applicantItem/ApplicantItem";

const ApplicationList = props => {
  const {
    applications,
    daoData,
    contract,
    contractData
  } = props;

  const applicationList = applications
    .sort(function(a, b) {
      return b.shares - a.shares;
    })
    .sort(function(x, y) {
      return x.applicantAddress.toLowerCase() ===
        daoData.summonerAddress.toLowerCase()
        ? -1
        : y.applicantAddress.toLowerCase() ===
          daoData.summonerAddress.toLowerCase()
        ? 1
        : 0;
    })
    .sort(function(x, y) {
      return x.status === "new" ? -1 : y.status === "new" ? 1 : 0;
    })
    .map((application, i) => {
      return (
        <div key={i} className="ApplicationList__Item">
          <ApplicantItem
            applicant={application}
            daoData={daoData}
            contract={contract}
            contractData={contractData}
          />
        </div>
      );
    });

  return <>{applicationList}</>;
};

export default ApplicationList;