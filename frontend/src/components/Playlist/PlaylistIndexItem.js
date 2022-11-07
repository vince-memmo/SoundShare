import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrack } from '../../store/tracks';
import { receiveQueue, getQueue } from '../../store/queue';
import { useState } from 'react';
import {Howl, Howler} from 'howler';
import Player, {handlePlay} from '../Player/index'
import {playingQueue, receivePlaying} from '../../store/playing'
import './PlaylistIndexItem.css'
import { receiveDuration } from '../../store/duration';

const PlaylistIndexItem = ({playlist}) => {
    const dispatch = useDispatch()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id
    
    // const handleClick = (track) => {
    //     const playButton = document.querySelector(`.play-pause-${track.id}`)
    //     const duration = document.getElementById(`audio-${track.id}`).duration
    //     if (playButton.innerHTML === 'Play') {
    //         console.log(currentTrack)
    //         if(track.id !== currentTrack.id && currentTrack.id) {
    //             dispatch(receiveDuration(duration))
    //             dispatch(receiveQueue(track))
    //             dispatch(receivePlaying(false))
    //         } else {
    //             dispatch(receiveDuration(duration))
    //             dispatch(receiveQueue(track))
    //             dispatch(receivePlaying(true))
    //         }
    //     } else {
    //         dispatch(receivePlaying(false))
    //     }
    // }

    // const buttonCreator = (track) => {
    //     if (playing && (track.id === currentTrack.id)) {
    //         return (
    //             <button className={`play-pause play-pause-${track.id}`} id={`${track.id}`} onClick={() => handleClick(track)}>Pause</button>
    //         )
    //     } else {
    //         return(
    //             <button className={`play-pause play-pause-${track.id}`} id={`${track.id}`} onClick={() => handleClick(track)}>Play</button>
    //         )
    //     }
    // }
    
debugger
    return (
        <>
            <div className='track-index-item'>
                <div className='thumbnail-container'>
                        {/* {buttonCreator(track)} */}
                    <img className='thumbnail' src={playlist.photoUrl}/>
                </div>
                <div className='track-info'>
                    <h3 className='track-title'>{playlist.name}</h3>
                    <h3 className='uploader-name'>Uploader</h3>
                </div>
            </div>
        </>
    )
}

export default PlaylistIndexItem