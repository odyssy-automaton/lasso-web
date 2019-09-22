import React from "react";

import "./ApplicationList.scss";

import ApplicantItem from "../applicantItem/ApplicantItem";

const ApplicationList = props => {
  const { applications, daoData, contract, contractData, data } = props;

  const applicationList = () => {
    console.log('sdfsdf sdfsdf', data.members[0].id.split("-")[1]);
    
    return data.members
      .sort(function(a, b) {        
        return b.shares - a.shares;
      })
      .sort(function(x, y) {
    console.log('sdfsdf sdfsdf dsfsf sdfsd fdsf ', x);
        
        return x.id.split("-")[1].toLowerCase() ===
          daoData.summonerAddress.toLowerCase()
          ? -1
          : y.id.split("-")[1].toLowerCase() ===
            daoData.summonerAddress.toLowerCase()
          ? 1
          : 0;
      })
      .map((member, i) => {
        return (
          <div key={i} className="ApplicationList__Item">
            <ApplicantItem
              applicant={member}
              daoData={daoData}
              contract={contract}
              contractData={contractData}
            />
          </div>
        );
      });
    }

  return <>{applicationList()}</>;
};

export default ApplicationList;
