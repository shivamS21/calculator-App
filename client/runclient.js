import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink,gql,ApolloProvider,graphql,useQuery } from '@apollo/client';

const GET_USER_DETAILS = gql`
 query getUserQuery($userId: String!) {
   getUserDetails(id: $userId) {
     name
     bio
   }
 }
`;

function UserDetails({temp}){
    console.log("Hello");
    const {loading,error,data} = useQuery( GET_USER_DETAILS,{ options:{
      variables: {userId:temp},client:client
    }
    });
    if(loading) console.log(loading);
    if(error) console.log(error);
    console.log(data);
    console.log(temp);
}

export default UserDetails;