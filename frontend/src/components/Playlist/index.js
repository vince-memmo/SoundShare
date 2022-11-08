import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPlaylists, getPlaylists } from "../../store/playlist";
import PlaylistIndexItem from "./PlaylistIndexItem";
import { createPlaylistItem } from "../../store/playlist_items";
import './index.css'

function Playlists({trackId}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(getPlaylists)
    const user_id = sessionUser.id
    
    useEffect(() => {
      dispatch(fetchUserPlaylists(user_id))
    }, [dispatch])


    return (
      <>
        <div className="playlist-add-title-container">
          <h1 className="playlist-add-title">Add To Playlist</h1>
        </div>
        <div className="playlist-add-title-border"></div>
        <div className="playlists-container">
            {playlists.map(playlist => 
              <>
                <PlaylistIndexItem trackId={trackId}  playlist={playlist}/>
              </>
              )}
        </div>
      </>
    );
  }
  
  export default Playlists;