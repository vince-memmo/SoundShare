import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveQueue } from '../../store/queue';
import {receivePlaying} from '../../store/playing'
import './PlaylistItemIndex.css'
import { receiveDuration } from '../../store/duration';
import { deletePlaylistItem } from '../../store/playlist_items';
import { useParams } from 'react-router-dom';

const PlaylistItemIndex = ({track, trackId}) => {
    const {playlistId} = useParams()
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

    const removePlaylistItem = () => {
        dispatch(deletePlaylistItem(trackId, parseInt(playlistId)))
    }

    return (
        <>
            <div className='playlist-item-container'>
                <div className='playlist-item-thumbnail-container'>
                        {buttonCreator(track)}
                    <img className='playlist-item-thumbnail' src={track.photoUrl}/>
                </div>
                <div className='playlist-item-track-info'>
                    <h3 className='playlist-item-track-title'>{track.name}</h3>
                    <h3 className='playlist-item-uploader-name'>-</h3>
                    <h3 className='playlist-item-uploader-name'>Uploader</h3>
                </div>
                <i className="fa-solid fa-trash" onClick={removePlaylistItem}></i>
                {/* <div className='playlist-item-container-border'></div> */}
            </div>
            <div className='playlist-item-container-border'></div>
            <audio id={`audio-${track.id}`}src={track.songUrl}></audio>
            {/* <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button> */}
            {/* <Link to={`/tracks/${track.id}/edit`}>Update Track</Link> */}
        </>
    )
}

export default PlaylistItemIndex