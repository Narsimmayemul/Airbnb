import React, { useContext } from 'react'
import { UrlContext } from '../context/url'
import { useAuth } from '../context/auth'

const Home = () => {

const { authenticated } = useAuth();
  return (
    <div>
      {/* <h1>{"Auth:  "+  authenticated}</h1> */}
      Home
    </div>
  )
}

export default Home
