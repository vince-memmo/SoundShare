import React, { Component, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../store/users";
import './index.css'

function UsersIndex() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    
    useEffect(() => {
      dispatch(fetchUsers())
    }, [dispatch])

    return (
      <>
        <div className='library-body'>
            <div className='headers'>
            </div>
            <div className='header-divider'></div>
            <div className='library-display-container'>
              <div className='users-index-container'>
                {Object.values(users).map(user => 
                  <>
                    <p id='usernames' className={`${user.id}`}>{user.username}</p>
                  </>
                  )}
              </div>
            </div>
        </div>
      </>
    )
  }
  
  export default UsersIndex;