import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { fetchTracks } from "../../store/tracks";
import './SplashPage.css';
import './SplashTeaser.css'
import './SplashMobile.css'
import splashImg1 from '../../assets/pics/carousel1.jpeg'
import splashImg3 from '../../assets/pics/carousel3.jpeg'
import splashImg4 from '../../assets/pics/carousel4.jpeg'
import { useSelector, useDispatch } from "react-redux"
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import { Redirect } from 'react-router-dom';
import { getTracks } from '../../store/tracks';
import { Swiper, SwiperSlide } from "swiper/react";
import TrackIndexSplash from '../Tracks/TrackIndexSplash';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SignupTodayModal from '../SignupFormModal/CreateAccountToday';

const SplashPage = () => {
    const dispatch = useDispatch()
    const tracks = useSelector(getTracks)

    useEffect(() => { 
        dispatch(fetchTracks())
    }, [dispatch])

    SwiperCore.use([Pagination, Autoplay])
    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) return <Redirect to="/discover" />;


    const swiperSlides = [splashImg1, splashImg3]
    const slide = []

    // for (let i = 0; i < 2; i++) {
    //     slide.push(
    //     <SwiperSlide tag='li' key={`slide-${i}`}>
    //         <img src={swiperSlides[i]} alt={`logo-${i}`} />
    //     </SwiperSlide>
    //     )
    // }

    return (
        <>
        <section className='splash-page'>
            <img src={splashImg4} alt={`banner`} className='splash-image'/>
            <div className='splash-banner'></div>
            <section className='splash-parent'>
                <div className='splash-logo-container'>
                    <div className='splash-logo'></div>
                    <p className='splash-soundshare'>SOUNDSHARE</p>
                </div>
                <section className='splashPage-buttons'>
                    <LoginFormModal />
                    <SignupFormModal />
                    <div className='for-creators'>For Creators</div>
                </section>
                <section className='splash-tagline-container'>
                    <p className='splash-tagline'>What's next in music is first on SoundShare</p>
                    <div className='splash-bio-container'>
                        <p className='splash-bio'>Upload your first track and begin your journey. SoundShare gives</p>
                        <p className='splash-bio'>you space to create, find your fans, and connect with other</p>
                        <p className='splash-bio'>artists.</p>
                    </div>
                    <SignupTodayModal />
                </section>
                </section>
                {/* <Swiper 
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    modules={[Pagination, Autoplay]}
                    id='swiper-container' wrapperTag='ul' pagination={{
                    clickable: true
                    }}
                    >
                    {slide}
                </Swiper> */}
        </section>
        <section className='splash-teaser'>
            <p className='trending-tracks-title'>Trending for free in the SoundShare community</p>
            <div className='trending-tracks-container'>
                {tracks.map(track => 
                    <TrackIndexSplash track={track}/>
                    )}
            </div>
            <div className='teaser-signup'>
                <SignupTodayModal />
            </div>
        </section>  ``
        <section className='splash-mobile-container'>
            <div className='phone-image'>

            </div>
            <div className='mobile-info'>
                <p className='never-stop-listening'>Never stop listening
                <div className='line'></div>
                </p>
                <div className='mobile-bio'>
                    <p className='mobile-bio-line'>SoundCloud is available on</p>
                    <p className='mobile-bio-line'>Web, iOS, Android, Sonos,</p>
                    <p className='mobile-bio-line'>Chromecast, and Xbox One.</p>
                </div>
                <div className='mobile-links'>
                    <div className='first-image'></div>
                    <div className='second-image'></div>
                </div>
            </div>
        </section>
        </>
    )

}

export default SplashPage