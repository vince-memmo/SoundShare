import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlaylistIndexItem.css'
import { createPlaylistItem } from '../../store/playlist_items';
import { fetchPlaylistItems } from '../../store/playlist_items';

const PlaylistIndexItem = ({playlist, trackID, playlistItems}) => {
    const dispatch = useDispatch()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id

    const addTracktoPlaylist = () => {
        debugger
        dispatch(createPlaylistItem(playlist.id, trackID))
    }

    const buttonCreator = () => {
        let inPlaylist = false

        for (let i = 0; i < Object.keys(playlistItems).length; i++) {
            if ((playlist.id === playlistItems[i].playlistId) && (playlistItems[i].trackId === trackID)) {
                inPlaylist = true
            }
        }

        if (inPlaylist) {
            return (
                <div className='added-to-playlist-commit' onClick={addTracktoPlaylist}>Added</div>
                )
        } else {
            return(
            <div className='add-to-playlist-commit' onClick={addTracktoPlaylist}>Add To Playlist</div>
        )
        }
    }
    
    return (
        <>
            <div className='playlist-index-item'>
                <div className='playlist-thumbnail-container'>
                        {/* {buttonCreator(track)} */}
                    <img className='playlist-thumbnail' src={playlist.photoUrl}/>
                </div>
                <div className='playlist-info'>
                    <h3 className='playlist-title'>{playlist.name}</h3>
                        {/* <div className='add-to-playlist-commit' onClick={addTracktoPlaylist}>Add To Playlist</div> */}
                        {buttonCreator()}
                </div>
            </div>
        </>
    )
}
export default PlaylistIndexItem

// const handleClick = (track) => {
//     const playButton = document.querySelector(`.play-pause-${track.id}`)
//     const duration = document.getElementById(`audio-${track.id}`).duration
//     if (playButton.innerHTML === 'Play') {
//         console.log(currentTrack)
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