import { gql } from 'apollo-boost';


export const GET_MEMBERDATA = gql` 
  query members($contractAddr: String!) {
    members(where: {molochAddress: $contractAddr}) {
        id
        delegateKey
        molochAddress
        shares
    }
   }
`