import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/sessionReducer';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import  './ProfileButton.css'
import { useHistory } from "react-router-dom";
import { receivePlaying } from "../../store/playing";


function ProfileButton({ user }) {
  const history = useHistory()
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
    dispatch(receivePlaying(false))
    history.push('./')
    dispatch(sessionActions.logout());
  };

  const goToCreatePlaylist = () => {
    history.push(`/create_playlist`)
  }

  const goToTracks = () => {
    history.push(`/${user_id}/tracks`)
  }

  const goPlaylists = () => {
    history.push(`/playlists`)
  }

  return (
    <div className="menu-container">
      <div className="menu-button" onClick={openMenu}>{sessionUser.username}</div>
      {showMenu && (
        <div className="profile-dropdown">
          <div>
            <div className="menu-logout" onClick={logout}>Log Out</div>
            <div className="menu-track" onClick={goToTracks}>Tracks</div>
            <div className="menu-create-playlist" onClick={goToCreatePlaylist}>Create Playlist</div>
            <div className="menu-create-playlist" onClick={goPlaylists}>Playlist</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;