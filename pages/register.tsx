import React from 'react'
import Layout from '../components/Layout'
import { Formik, Field } from 'formik'
import { InputField } from '../components/fields/InputField'
import { useRegisterMutation } from '../generated/apolloComponents';
import Router from 'next/router';

// Add YUP for error validation
export default () => {
  const [registerMutation] = useRegisterMutation();
  return (
    <Layout title="Register Page">
      <Formik onSubmit={async data => {
        const response = await registerMutation({
          variables: {
            data
          }
        })
        console.log(response)
        Router.push('/check-email')
      }} initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      }}>
        {({ handleSubmit }) => <form onSubmit={handleSubmit}>
          <Field 
            name="firstName" 
            placeholder="firstName" 
            component={InputField}
          />
          <Field 
            name="lastName" 
            placeholder="lastName" 
            component={InputField}
          />
          <Field 
            name="email"
            placeholder="email" 
            component={InputField}
          />
          <Field 
            name="password" 
            placeholder="Insert password"
            component={InputField}
            type="password"
          />
          <button type="submit">Submit</button>
        </form>}
      </Formik>
    </Layout>

  )
}