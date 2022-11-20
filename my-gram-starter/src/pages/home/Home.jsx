import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import Profileside from '../../components/Profileside/Profileside'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

const Home = () => {
  return (
    <div className="Home">
        <Profileside />
        <PostSide />
        <RightSide />
    </div>
  )
}

export default Home