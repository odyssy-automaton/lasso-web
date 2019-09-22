import React from "react";
import { useWeb3Context } from "web3-react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { get } from "../../util/requests";
import DaoList from "../../components/daoList/DaoList";
import SummonButton from "../../components/summonButton/summonButton";
import "./Home.scss";

const MOLOCHES_QUERY = gql`
  {
    factories(orderBy: count) {
      id
      title
      moloch
      summoner
      guildBankValue @client
      approvedToken @client
      apiData @client
    }
  }
`;

const Home = () => {
  const context = useWeb3Context();

  const { loading, error, data } = useQuery(MOLOCHES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div className="Hero">
        <h1>Explore the Haus of Moloch</h1>
        <h2>
          Discover and Pledge to existing Moloch DAOs, or summon your own.
        </h2>
        {context.active && !context.error && <SummonButton />}
      </div>
      <div className="View">
        <DaoList daos={data.factories} />
      </div>
    </>
  );
};

export default Home;
