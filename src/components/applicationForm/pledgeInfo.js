import { FastField, useFormikContext } from 'formik'
import React, { useState, useEffect, useContext } from 'react'
import { Web3Context, MolochContext } from "../../contexts/ContractContexts";


import { withRouter } from "react-router-dom";
import { addressToToken } from '../../util/constants';

function PledgeInfo(props) {
  const { errors, touched } = useFormikContext();
  const [contractData, setContractData] = useState({});
  const [molochContext] = useContext(MolochContext);
  
  useEffect(() => {
    const fetchData = async () => {

      const token = await molochContext.methods.approvedToken().call();
      const tokenSymbol = addressToToken[token];
      setContractData({tokenSymbol})
    };

    fetchData();
  }, [props.match.params.contractAddress]);

  return (
    <div className="Step">
      <div>
        <h3>Pledge</h3>
        <div className="Field">
          <label htmlFor="pledge">How much are you pledging?</label>
          <p className="InlineLabel">{contractData.tokenSymbol}</p>
          <FastField name="pledge" id="pledge" />
        </div>
      </div>
      <small style={{ color: 'red' }}>
        {touched.pledge && errors.pledge}
      </small>
    </div>
  )
}

export default withRouter(PledgeInfo)