import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlaylistIndexLibrary.css'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PlaylistIndexLibrary = ({playlist}) => {
    const dispatch = useDispatch()
    const playing = useSelector(state => state.playing);
    const sessionUser = useSelector(state => state.session.user);
    let currentTrack = useSelector(state => state.queue)
    const user_id = sessionUser.id
    const history = useHistory()
    
    return (
        <>
            <div className='playlist-library-item'>
                <div className='playlist-library-thumbnail-container'>
                    <img className='playlist-library-thumbnail' src={playlist.photoUrl}/>
                </div>
                <div className='playlist-library-info'>
                    <Link to={{
                        pathname:`/playlists/${playlist.id}`,
                        state:{playlist:playlist}
                        }}
                        className="library-playlist-title" >{playlist.name}
                    </Link>
                    <h3 className='library-playlist-uploader'>{playlist.artist}</h3>
                </div>
            </div>
        </>
    )
}
export default PlaylistIndexLibrary