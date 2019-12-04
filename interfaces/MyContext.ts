import { NextPageContext } from "next";
import { NormalizedCacheObject, ApolloClient } from "apollo-boost";

export interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}