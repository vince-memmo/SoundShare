import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPlaylists, getPlaylists } from "../../store/playlist";
import PlaylistIndexLibrary from "../Playlist/PlaylistIndexLibrary";
import { createPlaylistItem } from "../../store/playlist_items";
import './index.css'
import './PlaylistLibrary.css'

function PlaylistLibrary() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(getPlaylists)
    const user_id = sessionUser.id
    
    useEffect(() => {
      dispatch(fetchUserPlaylists(user_id))
    }, [dispatch])


    return (
      <>
      <div className="add-to-playlist">
        <p className="add-to-playlist-title">Click the three dots on a song's thumbnail to add it to a playlist</p>
        <i  className="fa-solid fa-ellipsis library-three-dots-button"></i>
      </div>
        <div className="library-playlists-container">
            {playlists.map(playlist => 
              <>
                <PlaylistIndexLibrary playlist={playlist}/>
              </>
              )}
        </div>
      </>
    );
  }
  
  export default PlaylistLibrary;
