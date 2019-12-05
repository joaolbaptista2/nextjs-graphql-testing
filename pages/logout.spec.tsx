import React from 'react'
import renderer from 'react-test-renderer'
import { MockedProvider, wait } from '@apollo/react-testing';
import { logoutMutation } from '../graphql/user/mutations/logout'
import Logout from './logout';
import Router  from 'next/router';

jest.mock('next/router', () => ({
  replace: () => {}
}))
let mockReplace;
beforeEach(() => {
 mockReplace = jest.spyOn(Router, 'replace');
})
afterEach(() => {
 jest.clearAllMocks()
})

describe('<Logout />', () => {
  const tree = renderer.create(<Logout />)
  it('should not regress', () => {
    expect(tree.toJSON).toMatchSnapshot()
  })

  it('should return null', () => {
    const instance = tree.root
    expect(instance.children).toMatchObject([])
  })

  it('should call logout mutation on getInitialProps', async () => {
    // To be finished
    const mocks = [
      {
        request: {
          query: logoutMutation
        },
        newData: jest.fn(() => ({
          data: {
            logout: true
            }
        })),
      },
    ]
    const logoutMockResult = mocks[0].newData;
    await renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Logout />
      </MockedProvider>
    )

    const props = await Logout.getInitialProps({apolloClient: { mutate: jest.fn(), resetStore: jest.fn()}, redirect: jest.fn()} as any)
    expect(mockReplace).toBeCalled()
    expect(props).toEqual({})
  })
})
