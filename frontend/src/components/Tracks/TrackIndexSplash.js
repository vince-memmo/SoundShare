import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrack } from '../../store/tracks';
import { receiveQueue, getQueue } from '../../store/queue';
import { useState } from 'react';
import {Howl, Howler} from 'howler';
import Player, {handlePlay} from '../Player/index'
import {playingQueue, receivePlaying} from '../../store/playing'
import './TrackIndexSplash.css'
import { receiveDuration } from '../../store/duration';

const TrackIndexSplash = ({track}) => {
    const dispatch = useDispatch()
    // const playing = useSelector(state => state.playing);
    let currentTrack = useSelector(state => state.queue)
    
    // const handleClick = (track) => {
    //     const playButton = document.querySelector(`.play-pause-${track.id}`)
    //     const duration = document.getElementById(`audio-${track.id}`).duration
    //     if (playButton.innerHTML === 'Play') {
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

    return (
        <>
        <div className='splash-index-item'>
            <img className='splash-thumbnail' src={track.photoUrl}/>
            <div className='track-info'>
                <h3 className='track-title'>{track.name}</h3>
                <h3 className='uploader-name'>Uploader</h3>
            </div>
        </div>
        </>
    )
}

export default TrackIndexSplash