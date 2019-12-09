import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import Login from './login'
import { loginMutation } from '../graphql/user/mutations/login'
import { act } from 'react-dom/test-utils'
import Router from 'next/router'

const mocks = [
  {
    request: { 
      query: loginMutation,
      variables: {
        email: 'testemail@xxx.com',
        password: 'MyPw12312@',
      },
    },
    result: jest.fn(() => ({
      data: {
        login: {
          id: 1,
          firstName: 'Test',
          lastName: 'Last',
          email: 'testemail@xxx.com',
          name: 'Test Last'
        }
      },
    })),
  }
]

describe('<Login/>', () => {
  it('Should not regress', () => {
    const container = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot();
  })
  
  it('should call the login mutation', async () => {
    Router.push = jest.fn()
    const container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>

    )
    
    const form = container.getByTestId('login-form')
    const emailField = container.getByTestId('email-input')
    const passwordField = container.getByTestId('password-input')
    fireEvent.change(emailField, { target: { value: 'testemail@xxx.com'}})
    fireEvent.change(passwordField, { target: { value: 'MyPw12312@'}})  
    fireEvent.submit(form)
    
    const loginResultMutation = mocks[0].result
    await wait(() => expect(loginResultMutation).toHaveBeenCalled())
  })

  it('should redirect to the root of the app after login', () => {
    jest.mock('next/router', ()=> ({push: jest.fn()}))
    const container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>

    )
    
    const form = container.getByTestId('login-form')
    const emailField = container.getByTestId('email-input')
    const passwordField = container.getByTestId('password-input')
    fireEvent.change(emailField, { target: { value: 'testemail@xxx.com'}})
    fireEvent.change(passwordField, { target: { value: 'MyPw12312@'}})  
    fireEvent.submit(form)

    expect(Router.push).toHaveBeenCalledWith('/')
  })
})

