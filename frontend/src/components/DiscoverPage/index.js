import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { fetchTracks } from "../../store/tracks";
import { getTracks } from "../../store/tracks";
import TrackIndexItem from "../Tracks/TrackIndexItem";
import './DiscoverPage.css'
import './DiscoverPlaylists.css'
import './DiscoverLikes.css'
import React, { Component } from "react";
import PlaylistIndexLibrary from '../Playlist/PlaylistIndexLibrary';
import { fetchUserLikes } from '../../store/likes';
import { fetchPlaylists, get5Playlists } from '../../store/playlist';
import { Link } from 'react-router-dom';
import LikesDiscoverIndex from '../Likes/LikesDiscoverIndex';
import { get3Likes, getLikes } from '../../store/likes';

function DiscoverPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const swiperSlides = []
    const tracks = useSelector(getTracks)
    let likes3 = useSelector(get3Likes)
    let likes = useSelector(getLikes)
    const playlists = useSelector(get5Playlists)
    const slides = []
    const user_id = sessionUser ? sessionUser.id : 1

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
      dispatch(fetchPlaylists())
      dispatch(fetchUserLikes(user_id))
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
                    slidesPerView={5}
                    simulateTouch={false}
                    navigation

                    >
                  {tracks.map(track => 
                    <SwiperSlide>
                      <TrackIndexItem track={track} likes={likes}/>
                    </SwiperSlide>
                  )}
              </Swiper>
            </div>
            <div className='singles-carousel-border'></div>
          <div className="playlists-carousel">
            <div className='singes-carousel-info'>
                <p className="singles-carousels-title">Playlists</p>
                <p className="singles-carousels-bio">Some playlists you may like</p>
                <section className="playlist-section">
                  <div className="playlist-carousel">
                    <div className="discover-playlists-container">
                      {playlists.map(playlist => 
                        <>
                          <PlaylistIndexLibrary playlist={playlist}/>
                        </>
                        )}
                    </div>
                  </div>
                </section>
            </div>
          </div>
        </div>
        </section>
        
        <div className="discover-likes">
          <div className='likes-title'>
            <p className="likes-bio">Likes</p>
            <Link to={`/library`} className='likes-link' >View all</Link>
          </div>
          <div className='likes-divider'></div>
          <section className='likes-container'>
            {likes3.map(like => 
              <>
                <LikesDiscoverIndex track={like} likes={likes3}/>
              </>
              )}
          </section>
          <div className='links-container'>
            <Link to={{ pathname: "https://github.com/vince-memmo/" }} target="_blank">
                  <i className="fa-brands fa-github"></i>
            </Link>
            <Link to={{ pathname: "https://www.linkedin.com/in/vince-memmo-394247105/" }} target="_blank">
                  <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
        </div>
        <div className="right-panel">
        </div>
      </div>
      </>
    )
  }
  
  export default DiscoverPage;