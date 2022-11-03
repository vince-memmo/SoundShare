import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/sessionReducer';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import  './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const user_id = sessionUser.id
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="menu-container">
      <div className="menu-button" onClick={openMenu}>{sessionUser.username}</div>
      {showMenu && (
        <div className="profile-dropdown">
          <div>
            <div className="menu-logout" onClick={logout}>Log Out</div>
            <Link to={`/${user_id}/tracks`}>Tracks</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;