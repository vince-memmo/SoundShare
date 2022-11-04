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

const TrackIndexItem = ({track}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id
    // let playingTrack = false;
    // const [prevSrc, setPrevSrc] = useState('')
    // const [src, setSrc] = useState('')
    // const [paused, setPaused] = useState(true)
    // const [sound, setSound] = useState(new Howl({
    //     src: [src],
    //     html5:true
    // }))

    
    const handleClick = (track) => {
        const playButton = document.querySelector(`.play-pause-${track.id}`);
        if (playButton.innerHTML === 'Play') {
            dispatch(receiveQueue(track))
            dispatch(receivePlaying(true))
        } else {
            dispatch(receivePlaying(false))
        }
    }

    return (
        <>
        <div className='track-index-item'>
            <div className='thumbnail-container'>
                <button className={`play-pause play-pause-${track.id}`} onClick={() => handleClick(track)}>Play</button>
                    <img className='thumbnail' src={track.photoUrl}/>
            </div>
                <h3>{track.name}</h3>
                <h3>Uploader</h3>
        </div>
            {/* <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button> */}
            {/* <Link to={`/tracks/${track.id}/edit`}>Update Track</Link> */}
        </>
    )
}

export default TrackIndexItem