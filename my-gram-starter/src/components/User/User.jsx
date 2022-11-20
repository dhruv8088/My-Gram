import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from '../../actions/userAction';


const User = ({person}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const [following, setFollowing] = useState(
        person.followers.includes(user._id)
      );
    const handleFollow = () => {
        following
          ? dispatch(unfollowUser(person._id, user))
          : dispatch(followUser(person._id, user));
        setFollowing((prev) => !prev);
      };
  return (
    <div className="follower">
    <div>
        <img src={person.profilePicture  ? (serverPublic + person.profilePicture)  : (serverPublic + "defaultProfile.jpg")} alt="" className='followerImage' />
        <div className="name">
            <span>{person.firstname}</span>
            <span>{person.username}</span>
        </div>
    </div>
    <button className='button fc-button' onClick={handleFollow}>
    {following ? "Unfollow" : "Follow"}
    </button>
    </div>
  )
}

export default User