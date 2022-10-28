import React from 'react';
import { NavLink } from 'react-router-dom';
import './SplashPage.css';
import splashImg1 from '../../assets/pics/carousel1.jpeg'
import splashImg3 from '../../assets/pics/carousel3.jpeg'
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
//import 'swiper/css/autoplay'


const SplashPage = () => {
    SwiperCore.use([Pagination, Autoplay])

    const swiperSlides = [splashImg1, splashImg3]
    const slide = []

    for (let i = 0; i < 2; i++) {
        slide.push(
        <SwiperSlide tag='li' key={`slide-${i}`}>
            <img src={swiperSlides[i]} alt={`logo-${i}`} />
        </SwiperSlide>
        )
    }

    return (
        <>
        <section className='splash-page'>
            <div className='splash-banner'></div>
            <section className='splash-parent'>
                <section className='splashPage-buttons'>
                    <LoginFormModal />
                    <SignupFormModal />
                    <div className='for-creators'>For Creators</div>
                </section>
                <Swiper 
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
                </Swiper>
            </section>
        </section>
        </>
    )

}

export default SplashPage