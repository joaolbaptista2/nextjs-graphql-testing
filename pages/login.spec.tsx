import React from 'react'
import { render, getByTestId, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import Login from './login'

describe('<Login/>', () => {
  it('Should not regress', () => {
    const container = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot();
  })
  
  it('Should enter the login details', () => {
    const mocks = [
      
    ]

    const container = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login />
      </MockedProvider>
    )
    const form = container.getByTestId('login-form')
    const emailField = container.getByTestId('email-input')
    const passwordField = container.getByTestId('password-input')
    // console.log(emailField)
    fireEvent.change(emailField, { target: { value: 'asadas'}})
    fireEvent.submit(form)
    // console.log(form)

  })
})

