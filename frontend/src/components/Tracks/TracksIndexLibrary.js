import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveQueue } from '../../store/queue';
import {receivePlaying} from '../../store/playing'
import './TrackIndexItem.css'
import { receiveDuration } from '../../store/duration';
import PlaylistModal from '../Playlist/PlaylistModal';

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
        <p>Tracks Library</p>
            {/* <div className='track-library-index-item'>
                <div className='library-thumbnail-container'>
                        {buttonCreator(track)}
                    <img className='library-thumbnail' src={track.photoUrl}/>
                        <PlaylistModal trackId={track.id}/>
                </div>
                <div className=''></div>
                <div className='library-track-info'>
                    <h3 className='track-title'>{track.name}</h3>
                    <h3 className='uploader-name'>Uploader</h3>
                </div>
            </div>
            <audio id={`audio-${track.id}`}src={track.songUrl}></audio> */}
            {/* <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button> */}
            {/* <Link to={`/tracks/${track.id}/edit`}>Update Track</Link> */}
        </>
    )
}

export default TrackIndexItem