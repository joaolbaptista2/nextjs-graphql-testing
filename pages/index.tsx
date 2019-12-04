import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { useLoginMutation } from '../generated/apolloComponents'


const IndexPage: NextPage = () => {
  const [loginMutation] = useLoginMutation({
    variables: {
      email: 'joao@xxx.com',
      password: 'ffasdsfsa211'
    }
  })
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
       <button onClick={async() => {
        const response = await loginMutation()
        console.log(response)
       }}>Login</button>
        
      </p>
    </Layout>
  )
}

export default IndexPage
