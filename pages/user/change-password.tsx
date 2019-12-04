import React from 'react'
import Layout from '../../components/Layout'
import { Formik, Field } from 'formik'
import { InputField } from '../../components/fields/InputField'
import { useChangePasswordMutation } from '../../generated/apolloComponents';
import Router from 'next/router';

import { NextPageContext } from 'next';

export interface MyPageContext extends NextPageContext {
  query: { token: string };
}
// Add YUP for error validation
const ChangePassword= ({token}: {token: string}) => {
  const [changePasswordMutation] = useChangePasswordMutation();
  return (
    <Layout title="Change Password Page">
      <Formik onSubmit={async data => {
        const response = await changePasswordMutation({
          variables: {
            data: {
              password: data.password,
              token: token
            }
          }
        })
        console.log(response)
        Router.push('/')
      }} initialValues={{
        password: '',
       
      }}>
        {({ handleSubmit }) => <form onSubmit={handleSubmit}>
          <Field 
            name="password"
            placeholder="password" 
            component={InputField}
            type="password"
          />
          <button type="submit">Submit</button>
        </form>}
      </Formik>
    </Layout>
  )
}

ChangePassword.getInitialProps = ({
  query: { token }
}: NextPageContext) => {
  return {
    token
  };
};

export default ChangePassword