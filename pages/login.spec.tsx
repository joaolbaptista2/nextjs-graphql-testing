import React from 'react'
// import renderer from 'react-test-renderer'
import Login from './login'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/react-testing';
import { loginMutation } from '../graphql/user/mutations/login';


configure({ adapter: new Adapter() });
jest.mock('../pages/login.tsx')
// const tree = renderer.create(
//   <MockedProvider mocks={[]} addTypename={false}>
//     <Login />
//   </MockedProvider>
// )

let wrapper = shallow(
 <MockedProvider mocks={[]} addTypename={false}>
   <Login/>
 </MockedProvider>
)

describe('Login Component', () => {
  it('should not regress', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // Enzyme
  it('should add the correct login data on Submit click', async() => {
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
    const component = await shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
       <Login />
     </MockedProvider>
    )
    // const form = await component.find('Login')
    
    
  })

    //test renderer
  it('should return user on Login', async () => {
  //   const component = await renderer.create(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Login />
  //     </MockedProvider>
  //   )

  //   const form = component.root.findByType('form');
  //   const emailField = tree.root.findByProps({name: 'email'})
    // emailField.value = 'joao@ustwo.com'
  //   console.log(emailField.props.component(emailField))

    // form.props.onSubmit()

  })
})