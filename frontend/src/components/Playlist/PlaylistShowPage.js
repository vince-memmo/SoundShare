import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTracks } from "../../store/tracks";
import { fetchUserTracks, deleteTrack } from "../../store/tracks";
import { fetchPlaylistItems } from "../../store/playlist_items";
import { fetchPlaylist } from "../../store/playlist"
import './PlaylistShowPage.css'
import PlaylistItemIndex from "../PlaylistItem/PlaylistItemIndex";
import { fetchTrackForPlaylist } from "../../store/tracks";
import TrackIndexItem from '../Tracks/TrackIndexItem'

function PlaylistShowPage() {
    const {playlistId} = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const playlistItems = useSelector(state => state.playlistItems);
    const tracks = useSelector(state => state.currentPlaylistTracks)
    const user_id = sessionUser.id
    
    useEffect(() => {
      dispatch(fetchPlaylistItems(playlistId))
    }, [dispatch])

    useEffect(() => {
      if (playlistItems[0]) {
        Object.values(playlistItems).forEach(playlistItem => {
          dispatch(fetchTrackForPlaylist(playlistItem.trackId))
        })
      }
    }, [playlistItems])
    
    // debugger

    return (
      <>
      <div className="playlist-show-body">
        <div>Playlist 1</div>
        <div className="playlist-items">
            {Object.values(tracks).map(track => 
              <>
                <PlaylistItemIndex track={track} trackId={track.id}/>
              </>
            )}
        </div>
      </div>
      </>
    );
  }
  export default PlaylistShowPage;