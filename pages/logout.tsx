import { MyContext } from '../interfaces/MyContext'
import { LogoutMutation } from '../generated/apolloComponents'
import { logoutMutation } from '../graphql/user/mutations/logout'
import redirect from '../lib/redirect';
const Logout = () => {
  return null;
}

Logout.getInitialProps = async ({apolloClient, ...ctx}: MyContext) => {
  await apolloClient.mutate<LogoutMutation>({
    mutation: logoutMutation
  })
  await apolloClient.resetStore()
  redirect(ctx, '/login')
  return {}
}

export default Logout;