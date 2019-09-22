import React from "react";
import CreateMoa from "../../components/moaForm/CreateMoa";

const Moa = props => <CreateMoa address={props.match.params.contractAddress} />;

export default Moa;
