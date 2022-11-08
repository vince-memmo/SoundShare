import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlaylistIndexLibrary.css'
import { createPlaylistItem } from '../../store/playlist_items';
import { useHistory } from 'react-router-dom';

const PlaylistIndexLibrary = ({playlist}) => {
    const dispatch = useDispatch()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id
    const history = useHistory()

    const goToPlaylistPage = () => {
        history.push(`/playlists/${playlist.id}`)
    }
    
    return (
        <>
            <div className='playlist-library-item'>
                <div className='playlist-library-thumbnail-container'>
                        {/* {buttonCreator(track)} */}
                    <img className='playlist-library-thumbnail' src={playlist.photoUrl}/>
                </div>
                <div className='playlist-library-info'>
                    <h3 className='library-playlist-title' onClick={goToPlaylistPage}>{playlist.name}</h3>
                    <h3 className='library-playlist-uploader'>Uploader</h3>
                </div>
            </div>
        </>
    )
}
export default PlaylistIndexLibrary