import React from 'react'
import { MyContext } from '../interfaces/MyContext'

import { MeQuery } from '../generated/apolloComponents'
import redirect from '../lib/redirect'
import { meQuery } from '../graphql/user/queries/me'

export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return class AuthComponent extends React.Component<P>{
    static async getInitialProps({
      apolloClient,
      ...ctx
    }: MyContext) {
      const response = await apolloClient.query<MeQuery>({ query: meQuery })
      if (!response || !response.data || !response.data.me) {
        redirect(ctx, "/")
        return {
          me: null
        }
      }
      return {
        me: response.data.me
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }
}