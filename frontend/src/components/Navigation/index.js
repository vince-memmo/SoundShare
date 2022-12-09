import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

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
              {/* <Link to={`/${user_id}/upload`}>Add Track</Link> */}
              <ProfileButton user={sessionUser} />
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