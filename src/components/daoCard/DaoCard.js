import React from "react";
import "./DaoCard.scss";

const DaoCard = props => {
  const { dao } = props;

  return (
    <>
      {dao.id ? (
        <div className="DaoCard">
          <h4 className="DaoName">{dao.title}</h4>
          <p>{dao.apiData.description}</p>
          <p>Summoner</p>
          <span className="Data">{dao.summoner}</span>
          <p>
            guildBankValue {dao.guildBankValue} {dao.approvedToken}
          </p>
        </div>
      ) : (
        <p>THE HAUS IS LOADING THE DAO</p>
      )}
    </>
  );
};

export default DaoCard;
