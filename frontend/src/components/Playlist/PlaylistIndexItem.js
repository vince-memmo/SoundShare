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
        dispatch(createPlaylistItem(playlist.id, trackID))
        const changedButton = document.getElementById(playlist.id)
        changedButton.className = 'added-to-playlist-commit'
        changedButton.innerHTML = 'Added'
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
                <div className='added-to-playlist-commit' id={playlist.id}>Added</div>
                )
        } else {
            return(
            <div className='add-to-playlist-commit' id={playlist.id} onClick={addTracktoPlaylist}>Add To Playlist</div>
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