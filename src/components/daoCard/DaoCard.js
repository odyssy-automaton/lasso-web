import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_MEMBERDATA } from "../../util/queries";

import "./DaoCard.scss";

const DaoCard = props => {
  const { dao } = props;
  const { loading, error, data } = useQuery(GET_MEMBERDATA, {
    variables: { contractAddr: dao.moloch }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
          <p>member count: {data.members.length}</p>
        </div>
      ) : (
        <p>THE HAUS IS LOADING THE DAO</p>
      )}
    </>
  );
};

export default DaoCard;
