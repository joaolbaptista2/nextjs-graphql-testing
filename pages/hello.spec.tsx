import React from 'react'
import { render } from '@testing-library/react'
import HelloComponent from './hello'
import { MockedProvider, wait } from '@apollo/react-testing'
import { helloQuery } from '../graphql/user/queries/hello'

describe('<HelloComponent />', () => {
  const mocks= [
    {
      request: {
        query: helloQuery
      },
      result:{
        data: {
          hello: 'Hello World!'
        }
      }
    }
  ]
  const container = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HelloComponent />
    </MockedProvider>
  )

  it('should not regress', () => {
    expect(container).toMatchSnapshot()
  })

  it('should render the data from the me query', async() => {
    const container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HelloComponent />
      </MockedProvider>
    )
    await wait(0)
    const div = container.getByTestId('data-render')
    expect(div.innerHTML).toContain('Hello World!')
  })
  it('should render an empty div if there is no query', async() => {
    const container = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <HelloComponent />
      </MockedProvider>
    )
    const div = container.getByTestId('data-render')
    await wait(0)
    expect(div.innerHTML).toContain('')
  })
})