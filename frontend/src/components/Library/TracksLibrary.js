import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPlaylists, getPlaylists } from "../../store/playlist";
import PlaylistIndexLibrary from "../Playlist/PlaylistIndexLibrary";
import { createPlaylistItem } from "../../store/playlist_items";
import './index.css'
import './TracksLibrary.css'
import TracksIndexLibrary from '../Tracks/TracksIndexLibrary'

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
        <div className="library-playlists-container">
            {playlists.map(playlist => 
              <>
                <TracksIndexLibrary playlist={playlist}/>
              </>
              )}
        </div>
      </>
    );
  }
  
  export default PlaylistLibrary;