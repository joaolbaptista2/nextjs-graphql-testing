import React from 'react'
import Layout from '../components/Layout'
import { Formik, Field } from 'formik'
import { InputField } from '../components/fields/InputField'
import { useForgotPasswordMutation } from '../generated/apolloComponents';
import Router from 'next/router';

// Add YUP for error validation
export default () => {
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  return (
    <Layout title="Forgot Password Page">
      <Formik onSubmit={async data => {
        const response = await forgotPasswordMutation({
          variables: data
        })
        console.log(response)
        Router.push('/check-email')
      }} initialValues={{
        email: '',
       
      }}>
        {({ handleSubmit }) => <form onSubmit={handleSubmit}>
          <Field 
            name="email"
            placeholder="email" 
            component={InputField}
          />
          <button type="submit">Submit</button>
        </form>}
      </Formik>
    </Layout>
  )
}