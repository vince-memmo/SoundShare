import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { receivePlaying } from '../../store/playing';
import * as sessionActions from '../../store/sessionReducer';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(receivePlaying(false))
    history.push('./')
    dispatch(sessionActions.logout())
    .then(newPlaylist => history.push('/'))
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <section className='navlink-section'>
          <ul className='nav-links'>
          <ul className='nav-links'>
            <div className='nav-left-elements'>
              <div className='nav-logo'></div>
              <NavLink exact to="/"><p className='home-button'>Home</p></NavLink>
              <Link to={`/library`}><p className='library-button'>Library</p></Link>
            </div>
            <div className='nav-searchbar-container'>
              <Link to={`/users`}><button className='nav-searchbar' type="search">Discover your fellow Artists</button></Link>
            </div>
            <div className='nav-right-elements'>
              <Link to={`/${sessionUser.id}/upload`} className='upload-button'><p >Upload</p></Link>
              <Link to={`/create_playlist`} className='upload-button'><p >Create Playlist</p></Link>
              <p className='upload-button logout-button' onClick={logout}>Log Out</p>
              <p className='upload-button'>{`Hello ${sessionUser.username}`}</p>
              {/* <Link to={`/${user_id}/upload`}>Add Track</Link> */}
              {/* <ProfileButton user={sessionUser} /> */}
            </div>
          </ul>
          </ul>
        </section>
      </>
    );
  } else {

  }

  return (
    <div>{sessionLinks}</div>
  );
}

export default Navigation;

//deploy