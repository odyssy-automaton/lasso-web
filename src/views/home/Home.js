import React from "react";
import { useWeb3Context } from "web3-react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { get } from "../../util/requests";
import DaoList from "../../components/daoList/DaoList";
import Background from "../../assets/bg.jpg"
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
      <div className="Hero" style={{backgroundImage: 'url(' + Background + ')'}}>
        <h1>Explore the land of Lassos</h1>
        <p>Moloch + OpenLaw + Wyoming</p>
        <p>
          Discover and Pledge to existing Lassos, or summon your own.
        </p>
        {context.active && !context.error && <SummonButton />}
      </div>
      <div className="View Intro">
        <h2>WTF is a Lasso?</h2>
        <p>Lasso is a colloquial acronym for 'legal, autonomous, self-sovereign organization'.</p>
        <p>A Lasso combines the security of <a href="https://github.com/MolochVentures/moloch" target="_blank" rel="noopener noreferrer">Moloch DAO</a> smart contracts and legal compliance of OpenLaw legal contracts to create a fully compliant and legal decentralized autonomous organization (DAO) in the state of Wyoming.</p>
        <p>Discover & pledge to existing Lassos, or summon your own.</p>
        <h2>Wyoming is blazing the trail in Blockchain.</h2>
        <p>Wyoming became the first elected body to recognize utility tokens as a new form of property that is neither securities nor money under Wyoming law. Wyoming offers blockchain businesses its most favorable tax, business entity and privacy protections.</p>
      </div>
      <div className="View">
        <DaoList daos={data.factories} />
      </div>
    </>
  );
};

export default Home;
