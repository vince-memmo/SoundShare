import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPlaylists, getPlaylists } from "../../store/playlist";
import PlaylistIndexLibrary from "../Playlist/PlaylistIndexLibrary";
import { createPlaylistItem } from "../../store/playlist_items";
import './index.css'
import './PlaylistIndex.css'
import { fetchUserTracks, getTracks } from "../../store/tracks";
import TrackIndexLibrary from "../Tracks/TrackIndexLibrary";

function UserInfo({userId, likes}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(getPlaylists)
    const tracks = useSelector(getTracks)
    
    useEffect(() => {
      dispatch(fetchUserPlaylists(userId))
      dispatch(fetchUserTracks(userId))
    }, [dispatch, userId, likes])

    return (
      <>
      <div className="add-to-playlist">
      </div>
        <div className="library-playlists-container">
            {playlists.map(playlist => 
            <>
                <PlaylistIndexLibrary playlist={playlist}/>
            </>
            )}
        </div>
        <div className='track-index-library-grid'>
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