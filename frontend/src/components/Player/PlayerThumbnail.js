import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveQueue } from '../../store/queue';
import {receivePlaying} from '../../store/playing'
import './PlayerThumbnail.css'
import { receiveDuration } from '../../store/duration';
import { useHistory } from 'react-router-dom';

const PlaylerThumbnail = ({track}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id

    const playerThumbnail = () => {
        if (currentTrack.name) {
            return (
            <>
                <div className='player-thumbnail-item'>
                    <img className='player-thumbnail' src={currentTrack.photoUrl}/>
                    <div className=''></div>
                    <div className='player-track-info'>
                        <h3 className='player-uploader-name'>{track.artist}</h3>
                        <h3 className='player-track-title' onClick={() => history.push(`/tracks/${track.id}/edit`)}>{track.name}</h3>
                        <audio id={`audio-${track.id}`}src={track.songUrl}></audio>
                    </div>
                </div>
            </>
            )
        } else {
            return (
                <div className='player-thumbnail-container'></div>
            )
        }
    }

            
    return (
        <>
            {playerThumbnail()}
        </>
    )
}

export default PlaylerThumbnail