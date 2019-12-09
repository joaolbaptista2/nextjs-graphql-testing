import React from 'react'
import { useHelloQuery } from '../generated/apolloComponents'


export default () => {
  const { data } = useHelloQuery();
  return (
    <div data-testid="data-render">{data && data.hello}</div>
  )
}