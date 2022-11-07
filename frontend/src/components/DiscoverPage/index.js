import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { fetchTracks } from "../../store/tracks";
import { getTracks } from "../../store/tracks";
import TrackIndexItem from "../Tracks/TrackIndexItem";
import './DiscoverPage.css'
import React, { Component } from "react";

function DiscoverPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const swiperSlides = []
    const tracks = useSelector(getTracks)
    const slides = []

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    SwiperCore.use([Pagination, Autoplay, Navigation])
    
    useEffect(() => { 
      dispatch(fetchTracks())
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />
    
    return (
      <>
      <div className="discover-content">
      <div className="left-panel"></div>
        <section className="carousel-section">
          <div className="singles-carousels">
            <div className='singes-carousel-info'>
              <p className="singles-carousels-title">Charts: Top 20</p>
              <p className="singles-carousels-bio">The most played tracks on SoundShare this week</p>
            </div>
            <div className="discover-singles-carousel">
              <Swiper {...settings}
                    loop={true}
                    slidesPerView={4}
                    simulateTouch={false}
                    navigation

                    >
                  {tracks.map(track => 
                    <SwiperSlide>
                      <TrackIndexItem track={track}/>
                    </SwiperSlide>
                  )}
              </Swiper>
            </div>
            <div className='singles-carousel-border'></div>
          <div className="playlists-carousel">
            <div className='singes-carousel-info'>
                <p className="singles-carousels-title">Playlists</p>
                <p className="singles-carousels-bio">Some playlists you may like</p>
            </div>
          </div>
         </div>
        </section>
        <div className="discover-sidebar"></div>
        <div className="right-panel"></div>
      </div>
      </>
    )
  }
  
  export default DiscoverPage;