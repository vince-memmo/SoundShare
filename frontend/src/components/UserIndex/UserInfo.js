import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPlaylists, getPlaylists } from "../../store/playlist";
import PlaylistIndexLibrary from "../Playlist/PlaylistIndexLibrary";
import { createPlaylistItem } from "../../store/playlist_items";
import './index.css'
import './PlaylistIndex.css'
import './TracksIndex.css'
import './UserInfo.css'
import { fetchUserTracks, getTracks } from "../../store/tracks";
import TrackIndexLibrary from "../Tracks/TrackIndexLibrary";

function UserInfo({userId, likes, username}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(getPlaylists)
    const tracks = useSelector(getTracks)
    const users = useSelector(state => state.users)
    
    useEffect(() => {
      dispatch(fetchUserPlaylists(userId))
      dispatch(fetchUserTracks(userId))
    }, [dispatch, userId, likes])

    return (
      <>
      <div className="add-to-playlist">
      </div>
        <p className="user-playlist-title">{`${username}'s Playlists`}</p>
        <div className="users-library-playlists-container">

            {playlists.map(playlist => 
            <>
                <PlaylistIndexLibrary playlist={playlist}/>
            </>
            )}
        </div>
        <p className="user-track-title">{`${username}'s Tracks`}</p>
        <div className='users-track-index-library-grid'>
        {tracks.map(track => 
            <>
                <TrackIndexLibrary track={track} likes={likes}/>
            </>
            )}
        </div>
      </>
    );
  }
  
  export default UserInfo;