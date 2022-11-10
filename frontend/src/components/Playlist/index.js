import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPlaylists, getPlaylists } from "../../store/playlist";
import PlaylistIndexItem from "./PlaylistIndexItem";
import { fetchPlaylistItemsByTrackId } from "../../store/playlist_items";
import './index.css'

function Playlists({trackId}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(getPlaylists)
    const playlistItems = useSelector(state => state.playlistItems)
    const user_id = sessionUser.id
    
    useEffect(() => {
      dispatch(fetchUserPlaylists(user_id))
    }, [dispatch])

    useEffect(() => {
      dispatch(fetchPlaylistItemsByTrackId(trackId))
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
                <PlaylistIndexItem trackID={trackId}  playlist={playlist} playlistItems={playlistItems}/>
              </>
              )}
        </div>
      </>
    );
  }
  
  export default Playlists;