import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrack } from '../../store/tracks';
import { receiveQueue, getQueue } from '../../store/queue';
import { useState } from 'react';
import {Howl, Howler} from 'howler';
import Player, {handlePlay} from '../Player/index'
import {playingQueue, receivePlaying} from '../../store/playing'
import './TrackIndexItem.css'
import { receiveDuration } from '../../store/duration';

const TrackIndexItem = ({track}) => {
    const dispatch = useDispatch()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id
    
    const handleClick = (track) => {
        const playButton = document.querySelector(`.play-pause-${track.id}`)
        const duration = document.getElementById(`audio-${track.id}`).duration
        if (playButton.innerHTML === 'Play') {
            console.log(currentTrack)
            if(track.id !== currentTrack.id && currentTrack.id) {
                dispatch(receiveDuration(duration))
                dispatch(receiveQueue(track))
                dispatch(receivePlaying(false))
            } else {
                dispatch(receiveDuration(duration))
                dispatch(receiveQueue(track))
                dispatch(receivePlaying(true))
            }
        } else {
            dispatch(receivePlaying(false))
        }
    }

    const buttonCreator = (track) => {
        if (playing && (track.id === currentTrack.id)) {
            return (
                <button className={`play-pause play-pause-${track.id}`} id={`${track.id}`} onClick={() => handleClick(track)}>Pause</button>
            )
        } else {
            return(
                <button className={`play-pause play-pause-${track.id}`} id={`${track.id}`} onClick={() => handleClick(track)}>Play</button>
            )
        }
    }

    return (
        <>
        <div className='track-index-item'>
            <div className='thumbnail-container'>
                {buttonCreator(track)}
                <img className='thumbnail' src={track.photoUrl}/>
            </div>
                <h3>{track.name}</h3>
                <h3>Uploader</h3>
        </div>
        <audio id={`audio-${track.id}`}src={track.songUrl}></audio>
            {/* <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button> */}
            {/* <Link to={`/tracks/${track.id}/edit`}>Update Track</Link> */}
        </>
    )
}

export default TrackIndexItem