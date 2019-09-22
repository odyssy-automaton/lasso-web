import React from "react";
import CreateMao from "../../components/maoForms/CreateMao";

const Mao = props => <CreateMao address={props.match.params.contractAddress} />;

export default Mao;
