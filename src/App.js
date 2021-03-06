import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Web3Provider, { Connectors } from "web3-react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Routes from "./Routes";
import TopNav from "./components/topNav/TopNav";
import Footer from "./components/footer/Footer";
import ContractContexts from "./contexts/ContractContexts";
import { resolvers } from "./util/resolvers";

import "./global.scss";
import "./App.css";

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [42] });
// const MetaMask = new InjectedConnector({ supportedNetworks: [1] });

const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_INFURA_URI
});

const connectors = { MetaMask, Infura };

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/skuhlmann/molochfactorykovan",
  clientState: {
    resolvers
  }
});

function App() {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={"ethers.js" | "web3.js" | null}
    >
      <ApolloProvider client={client}>
        <ContractContexts>
          {" "}
          <div className="App">
            <Router>
              <TopNav />
              <Routes />
              <Footer />
            </Router>
          </div>
        </ContractContexts>
      </ApolloProvider>
    </Web3Provider>
  );
}

export default App;
