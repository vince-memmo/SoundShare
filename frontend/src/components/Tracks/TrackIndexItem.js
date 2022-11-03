import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrack } from '../../store/tracks';
import { receiveQueue, getQueue } from '../../store/queue';
import { useState } from 'react';
import {Howl, Howler} from 'howler';
import './TrackIndexItem.css'

const TrackIndexItem = ({track}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id
    let playingTrack = false;
    const [prevSrc, setPrevSrc] = useState('')
    const [src, setSrc] = useState('')
    const [paused, setPaused] = useState(true)
    const [sound, setSound] = useState(new Howl({
        src: [src],
        html5:true
    }))

    
    const handlePlay = (track) => {
        dispatch(receiveQueue(track))
        if((prevSrc === track.songUrl && prevSrc !== '') && paused === false){
            sound.pause()
            setPaused(!paused)
        } else {
            sound._src = track.songUrl
            setPaused(!paused)
            playSong()
        }
        setPrevSrc(track.songUrl)
        const playButton = document.querySelector(`.play-pause-${track.id}`);
        if (playButton.innerHTML === 'Play') {
            playButton.innerHTML = 'Pause'
        } else {
            playButton.innerHTML = 'Play'
        }
    }

    const playSong = () => {
        sound.play()
    }

    return (
        <>
        <li>
            <h3>{track.name}</h3>
            <div className='thumbnail-container'>
                <img className='thumbnail' src={track.photoUrl}/>
            </div>
            <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button>
            <button className={`play-pause-${track.id}`} onClick={() => handlePlay(track)}>Play</button>
            <Link to={`/tracks/${track.id}/edit`}>Update Track</Link>
        </li>
        </>
    )
}

export default TrackIndexItem