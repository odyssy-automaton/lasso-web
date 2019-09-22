import React, { useState, useEffect } from "react";
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
    }
  }
`;

const Home = () => {
  const [daosData, setDaosData] = useState([]);
  const context = useWeb3Context();
  const { loading, error, data } = useQuery(MOLOCHES_QUERY);

  console.log("data", data);

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/`);
      setDaosData(daoRes.data.reverse());
    };

    fetchData();
  }, []);

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
        <p>Lasso is a colloquialism  legal, autonomoous, self-sovereign organizations.</p>
        <p>A Lasso combines the security of <a href="https://github.com/MolochVentures/moloch" target="_blank" rel="noopener noreferrer">Moloch DAO</a> smart contracts and legal compliance of OpenLaw legal contracts to create a fullly compliant and legal decentralized autonomous organization (DAO).</p>
        <p>Discover & pledge to existing Lassos, or summon your own.</p>
      </div>
      <div className="View">
        {daosData.length ? (
          <DaoList daos={daosData} />
        ) : (
          <p>LASSO IS LOADING THE DAOS</p>
        )}
      </div>
    </>
  );
};

export default Home;
