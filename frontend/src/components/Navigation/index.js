import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <NavLink exact to="/">Home</NavLink>
      </>
    );
  } else {

  }

  return (
    <section className='navlink-section'>
      <ul>
          {sessionLinks}
      </ul>
    </section>
  );
}

export default Navigation;