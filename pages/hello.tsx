import React from 'react'
import { useHelloQuery } from '../generated/apolloComponents'


export default () => {
  const { data } = useHelloQuery();
  return (
    <div>{data && data.hello}</div>
  )
}