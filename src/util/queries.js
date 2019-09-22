import { gql } from 'apollo-boost';

export const GET_METADATA = gql`
  query Metadata {
    currentPeriod @client
    totalShares @client
    guildBankAddr @client
    gracePeriodLength @client
    votingPeriodLength @client
    periodDuration @client
    processingReward @client
    proposalDeposit @client
    guildBankValue @client
    shareValue @client
  }
`;

export const GET_MEMBERDATA = gql` 
  query members($contractAddr: String!) {
    members(where: {molochAddress: $contractAddr}) {
        id
        delegateKey
        molochAddress
    }
   }
`