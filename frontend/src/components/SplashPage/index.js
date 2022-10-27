import React from 'react';
import { NavLink } from 'react-router-dom';
import './SplashPage.css';
import splashImg from '../../assets/pics/splash_image.jpeg'

const SplashPage = () => {

    return (
        <>
        <section className='splash-parent'>
            <section className='splashPage-buttons'>
                <NavLink to="/login">
                    <button className="signup-button" >Sign In</button>
                </NavLink>
                <NavLink to="/signup">
                    <button className="login-button">Create Account</button>
                </NavLink>
            </section>
            <img src={splashImg} alt="logo" />
        </section>
        </>
    )

}

export default SplashPage