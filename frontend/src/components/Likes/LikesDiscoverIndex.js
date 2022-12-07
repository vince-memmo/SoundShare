import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveQueue } from '../../store/queue';
import {receivePlaying} from '../../store/playing'
import './LikesDiscoverIndex.css'
import { receiveDuration } from '../../store/duration';
import { deletePlaylistItem } from '../../store/playlist_items';
import { useParams } from 'react-router-dom';
import { useHistory
 } from 'react-router-dom';
 
const LikesDiscoverIndex = ({track}) => {
    const {playlistId} = useParams()
    const history = useHistory()
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

    const buttonCreator = (track) => {
        if (playing && (track.id === currentTrack.id)) {
            return (
                <div className={`play-item-pause`} id={`play-pause-${track.id}`} onClick={() => handleClick(track)}></div>
                )
        } else {
            return(
                <div className={`play-item-play`} id={`play-pause-${track.id}`} onClick={() => handleClick(track)}></div>
                )
        }
    }

    return (
        <>
            <div className='like-item-container'>
                <div className='like-item-thumbnail-container'>
                        {buttonCreator(track)}
                    <img className='like-item-thumbnail' src={track.photoUrl}/>
                </div>
                <div className='like-item-track-info'>
                    <h3 className='like-item-track-title'>{track.name}</h3>
                    <h3 className='like-item-uploader-name'>Uploader</h3>
                </div>
            </div>
            <audio id={`audio-${track.id}`}src={track.songUrl}></audio>
            {/* <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button> */}
            {/* <Link to={`/tracks/${track.id}/edit`}>Update Track</Link> */}
        </>
    )
}

export default LikesDiscoverIndex