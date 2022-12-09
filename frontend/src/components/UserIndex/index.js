import React, { Component, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../store/users";
import './index.css'
import { fetchUserLikes } from "../../store/likes";
import UserInfo from "./UserInfo";

function UsersIndex() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const user_id = sessionUser.id
    const likes = useSelector(state => state.likes);
    const [userId, setUserId] = useState(user_id)
    const [username, setUsername] = useState(sessionUser.username)

    
    useEffect(() => {
      dispatch(fetchUsers())
      dispatch(fetchUserLikes(user_id))
    }, [dispatch])

    const setUser = (user) => {
      setUserId(user.id)
      setUsername(user.username)
    }

    const display = () => {
      return <UserInfo userId={userId} username = {username} likes={likes}/>
    }

    return (
      <>
        <div className='library-body'>
            <div className='users-headers'>
              <p>Click on the SoundShare artist to check out their Playlists and Songs</p>
            </div>
            <div className='header-divider'></div>
            <div className='user-index-display-container'>
              <div className='users-index-container'>
                {Object.values(users).map(user => 
                  <>
                    <p id='usernames' className={`${user.id}`} onClick={() => setUser(user)}>{user.username}</p>
                  </>
                  )}
              </div>
              <div className="users-info-container">
                {display()}
              </div>
            </div>
        </div>
      </>
    )
  }
  
  export default UsersIndex;