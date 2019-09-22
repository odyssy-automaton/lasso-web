import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { getProfile } from "3box/lib/api";
import makeBlockie from "ethereum-blockies-base64";

import { truncateAddr } from "../../util/helpers";

import "./MemberItem.scss";
import { WethContext, DaiContext, Web3Context } from "../../contexts/ContractContexts";
import { addressToToken } from "../../util/constants";

const MemberItem = props => {
  const { applicant, daoData, contract, contractData } = props;
  const [currentApplicant, setCurrentApplicant] = useState([]);

  const [web3Service] = useContext(Web3Context);
  const [wethService] = useContext(WethContext);
  const [daiService] = useContext(DaiContext);

  useEffect(() => {

    const setup = async () => {
      if (applicant.id.split("-")[1] && contract) {
        const _applicant = applicant.id.split("-")[1];
        
        const daoToken = contractData.token;
        
        let profile;
        try {
          profile = await getProfile(_applicant);
        } catch {
          profile = {};
        }
        if (addressToToken[daoToken] === "Weth") {
          const allowance = await wethService.allowance(
            _applicant,
            daoData.contractAddress
          );
          const balanceOf = await wethService.balanceOf(_applicant);
          // console.log(_applicant, allowance, "<=", balanceOf );

          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            {
              addr: _applicant,
              inEth: web3Service.fromWei(allowance),
              balanceOf: web3Service.fromWei(balanceOf),
              profile: profile
            }
          ]);

          return true;
        } else if (addressToToken[daoToken] === "Dai") {
          const allowance = await daiService.allowance(
            _applicant,
            daoData.contractAddress
          );
          const balanceOf = await daiService.balanceOf(_applicant);
          // console.log(_applicant, allowance, "<=", balanceOf );

          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            {
              addr: _applicant,
              inEth: web3Service.fromWei(allowance),
              balanceOf: web3Service.fromWei(balanceOf),
              profile: profile
            }
          ]);
          
          return true;
        } else {
          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            { addr: _applicant, inEth: "", balanceOf: "", profile: {} }
          ]);

          return false;
        }
      }
    };
    setup();
  }, [applicant.id.split("-")[1]]);

  if (applicant.shares === "0") {
    applicant.status = "Zero share member";
  }

  if (
    applicant.id.split("-")[1].toLowerCase() ===
    daoData.summonerAddress.toLowerCase()
  ) {
    applicant.status = "Summoner";
  }

  if (applicant.status === "new") {
    applicant.status = "New Pledge";
  }

  if (!applicant.status) {
    applicant.status = "Member";
  }

  const applicantProfile = currentApplicant.find(
    item => item.addr === applicant.id.split("-")[1]
  );

  return (
    <Link to={`/profile/${applicant.id.split("-")[1]}`}>
      <div className="Row MemberInfo">
        <p>{applicant.status}</p>
        {applicant.status === "New Pledge" ? (
          <p>Requesting {applicant.shares} Shares</p>
        ) : (
          <p>{applicant.shares} Shares</p>
        )}
      </div>
      <div className="Row ProfileInfo">
        {applicantProfile &&
        applicantProfile.profile &&
        applicantProfile.profile.image &&
        applicantProfile.profile.image[0] ? (
          <div
            className="ProfileImgCard"
            style={{
              backgroundImage: `url(${"https://ipfs.infura.io/ipfs/" +
                applicantProfile.profile.image[0].contentUrl["/"]})`
            }}
          >
            {""}
          </div>
        ) : (
          <div
            className="ProfileImgCard"
            style={{
              backgroundImage: `url("${makeBlockie(
                applicant.id.split("-")[1]
              )}")`
            }}
          >
            {""}
          </div>
        )}
        <div>
          {applicantProfile &&
          applicantProfile.profile &&
          applicantProfile.profile.name ? (
            <h2>
              {applicantProfile.profile.name}{" "}
              {applicantProfile.profile.emoji ? (
                <span>{applicantProfile.profile.emoji} </span>
              ) : null}
            </h2>
          ) : null}
          <p>{truncateAddr(applicant.id.split("-")[1])}</p>
        </div>
      </div>
      {applicant.status === "New Pledge" && (
        <div className="Row PledgeInfo">
          {applicantProfile && <p>{"" + applicantProfile.inEth} approved</p>}
          {applicantProfile &&
          parseInt(applicantProfile.inEth) <= parseInt(applicantProfile.balanceOf) ? (
            <p className="Success">Tribute ready</p>
          ) : (
            <p className="Danger">Insufficient funds</p>
          )}
        </div>
      )}
    </Link>
  );
};

export default MemberItem;