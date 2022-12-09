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
    
    useEffect(() => {
      dispatch(fetchUsers())
      dispatch(fetchUserLikes(user_id))
    }, [dispatch])

    const display = () => {
      return <UserInfo userId={userId} likes={likes}/>
    }

    return (
      <>
        <div className='library-body'>
            <div className='headers'>
            </div>
            <div className='header-divider'></div>
            <div className='user-index-display-container'>
              <div className='users-index-container'>
                {Object.values(users).map(user => 
                  <>
                    <p id='usernames' className={`${user.id}`} onClick={() => setUserId(user.id) }>{user.username}</p>
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