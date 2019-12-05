import React from 'react'
import renderer, { act } from 'react-test-renderer'
import Login from './login'
import { MockedProvider } from '@apollo/react-testing'
import { loginMutation } from '../graphql/user/mutations/login'
import { render } from 'react-dom'

const tree = renderer.create(
  <MockedProvider mocks={[]} addTypename={false}>
    <Login />
  </MockedProvider>

)

describe('Login Component', () => {
  it('should not regress', () => {

    expect(tree.toJSON).toMatchSnapshot()
  })

  it('should return user on Login', async () => {
    const mocks = [
      {
        request: {
          query: loginMutation,
          variables: {
            email: 'testemail@xxx.com',
            password: 'MyPw12312@',
          },
        },
        result: {
          data: {
            login: {
              id: 1,
              firstName: 'Test',
              lastName: 'Last',
              email: 'testemail@xxx.com',
              name: 'Test Last'
            }
          }
        }
      }
    ]
    const form = tree.root.findByType('form');
    const email = tree.root.findByProps({name: 'email'})
    form.props.onSubmit()

  })
})