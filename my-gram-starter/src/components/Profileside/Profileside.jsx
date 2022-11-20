import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './Profileside.css'
const Profileside = () => {
  return (
    <div className='Profileside'>
        <LogoSearch />
        <ProfileCard location={"homepage"}/>
        <FollowersCard />
    </div>
  )
}

export default Profileside