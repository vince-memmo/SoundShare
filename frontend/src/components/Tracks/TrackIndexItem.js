import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveQueue } from '../../store/queue';
import {receivePlaying} from '../../store/playing'
import './TrackIndexItem.css'
import { receiveDuration } from '../../store/duration';
import PlaylistModal from '../Playlist/PlaylistModal';
import { createLike } from '../../store/likes';

const TrackIndexItem = ({track}) => {
    const dispatch = useDispatch()
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

    const likeToggle = (e) => {
        const trackId = parseInt(e.target.id.slice(5))
        const likeEl = document.getElementById(e.target.id)
        if (likeEl.className === 'fa-solid fa-heart index-unliked') {
            likeEl.className = 'fa-solid fa-heart index-liked'
            dispatch(createLike(user_id, trackId))
        } else {
            likeEl.className = 'fa-solid fa-heart index-unliked'
        }


    }

    const buttonCreator = (track) => {
        if (playing && (track.id === currentTrack.id)) {
            return (
                <>
                    <div className='button-container'>
                        <div className={`play-item-pause`} id={`play-pause-${track.id}`} onClick={() => handleClick(track)}></div>
                    </div>
                </>
                )
        } else {
            return(
                <>
                    <div className='button-container'>
                        <div className={`play-item-play`} id={`play-pause-${track.id}`} onClick={() => handleClick(track)}></div>
                    </div>
                </>
                )
            }
        }
            
    return (
        <>
            <div className='track-index-item'>
                <div className='thumbnail-container'>
                        {buttonCreator(track)}
                    <img className='thumbnail' src={track.photoUrl}/>
                    <div className='track-index-buttons'>
                        <i class="fa-solid fa-heart index-unliked" id={`like-${track.id}`} onClick={likeToggle}></i>
                        <PlaylistModal trackId={track.id}/>
                    </div>
                </div>
                <div className=''></div>
                <div className='track-info'>
                    <h3 className='track-title'>{track.name}</h3>
                    <h3 className='uploader-name'>Uploader</h3>
                </div>
            </div>
            <audio id={`audio-${track.id}`}src={track.songUrl}></audio>
            {/* <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button> */}
            {/* <Link to={`/tracks/${track.id}/edit`}>Update Track</Link> */}
        </>
    )
}

export default TrackIndexItem