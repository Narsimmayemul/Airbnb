import React, { useContext } from 'react'
import { UrlContext } from '../context/url'

const Home = () => {
  const {url} = useContext(UrlContext);
  console.log(url);
  return (
    <div>
      Home
    </div>
  )
}

export default Home
