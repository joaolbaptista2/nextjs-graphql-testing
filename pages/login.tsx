import React from 'react'
import { Formik, Field } from 'formik'
import { InputField } from '../components/fields/InputField'
import { useLoginMutation, MeQuery } from '../generated/apolloComponents'
import Router from 'next/router'
import { meQuery } from '../graphql/user/queries/me'

const Login = () => {
  const [loginMutation] = useLoginMutation()
  return (
    <Formik onSubmit={async data => {
      console.log(data)
      const response = await loginMutation({
        variables: data,
        update: (cache, {data}) => {
          if (!data) {
            return
          }
          cache.writeQuery<MeQuery>({
            query: meQuery,
            data: {
              __typename: "Query",
              me: data.login
            }
          })
        }
      })
      if (response && response.data && !response.data.login) {
        console.log('Invalid login!')
      }
      Router.push('/')
    }} initialValues={{
      email: '',
      password: ''
    }}>
      {({ handleSubmit  }) => <form data-testid="login-form" onSubmit={handleSubmit}>
        <Field
          data-testid="email-input"
          name="email"
          placeholder="email"
          component={InputField}
        />
        <Field
          data-testid="password-input"
          name="password"
          placeholder="password"
          component={InputField}
          type="password"
        />
        <button type="submit">Login</button>
      </form>}
    </Formik>
  )

}

export default Login