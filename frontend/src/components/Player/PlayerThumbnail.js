import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveQueue } from '../../store/queue';
import {receivePlaying} from '../../store/playing'
import './TrackIndexLibrary.css'
import { receiveDuration } from '../../store/duration';
import PlaylistModal from '../Playlist/PlaylistModal';
import { useHistory } from 'react-router-dom';

const PlaylerThumbnail = ({track}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id
    
    const handleClick = (track) => {
        const playButton = document.getElementById(`play-pause-${track.id}`)
        const duration = document.getElementById(`audio-${track.id}`).duration
        if (playButton.className === 'play-item-play') {
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
            
    return (
        <>
            <div className='track-index-item'>
                <div className='thumbnail-container'>
                        {buttonCreator(track)}
                    <img className='thumbnail' src={track.photoUrl}/>
                        <PlaylistModal trackId={track.id}/>
                </div>
                <div className=''></div>
                <div className='track-info'>
                    <h3 className='library-track-title' onClick={() => history.push(`/tracks/${track.id}/edit`)}>{track.name}</h3>
                    <h3 className='uploader-name'>Uploader</h3>
                </div>
            </div>
        </>
    )
}

export default PlaylerThumbnail