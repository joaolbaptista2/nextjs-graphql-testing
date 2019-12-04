import React from 'react'
import renderer from 'react-test-renderer'
import ListItem from './ListItem'
import { User } from '../interfaces'

const mockedItem: User = {
 id: 1,
 name: 'Test User'
}

describe('List Item Component', () => {
  it('should not regress', () => {
    const tree = renderer.create(
      <ListItem data={mockedItem} />
    )
    expect(tree.toJSON).toMatchSnapshot
    console.log(1)
  })
})