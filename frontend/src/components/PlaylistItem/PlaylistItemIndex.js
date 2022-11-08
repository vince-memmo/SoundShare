import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackForPlaylist } from '../../store/tracks';

const PlaylistItemIndex = ({playlistItem}) => {
    const dispatch = useDispatch()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id
    
    useEffect(() => {
        dispatch(fetchTrackForPlaylist(playlistItem.trackId))
    }, [])
    
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
        {/* <div>{playlistItemId}</div>
            <div className='track-index-item'>
                <div className='thumbnail-container'>
                        {buttonCreator(track)}
                    <img className='thumbnail' src={track.photoUrl}/>
                    <div className='add-to-playlist-button'>
                        <PlaylistModal trackId={track.id}/>
                    </div>
                </div>
                <div className='track-info'>
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
export default PlaylistItemIndex