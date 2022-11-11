import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTracks } from "../../store/tracks";
import { fetchUserTracks, deleteTrack } from "../../store/tracks";
import { fetchPlaylistItems } from "../../store/playlist_items";
import { fetchPlaylist } from "../../store/playlist"
import './PlaylistShowPage.css'
import PlaylistItemIndex from "../PlaylistItem/PlaylistItemIndex";
import { fetchTrackForPlaylist } from "../../store/tracks";
import TrackIndexItem from '../Tracks/TrackIndexItem'

function PlaylistShowPage({playlist}) {
    const location = useLocation()
    const preSelectedPlaylist = location.state ? location.state.playlist : {}
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

    return (
      <>
      <div className="playlist-show-body">
        <div className='playlist-library-item'>
            <div className='playlist-library-thumbnail-container'>
                    {/* {buttonCreator(track)} */}
                <img className='playlist-library-thumbnail' src={preSelectedPlaylist.photoUrl}/>
            </div>
            <div className='playlist-library-info'>
                <h3 className='library-playlist-title'>{preSelectedPlaylist.name}</h3>
                <h3 className='library-playlist-uploader'>Uploader</h3>
            </div>
        </div>
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
      // <div className='playlist-library-item'>
      //     <div className='playlist-library-thumbnail-container'>
      //             {/* {buttonCreator(track)} */}
      //         <img className='playlist-library-thumbnail' src={playlist.photoUrl}/>
      //     </div>
      //     <div className='playlist-library-info'>
      //         <h3 className='library-playlist-title' onClick={goToPlaylistPage}>{playlist.name}</h3>
      //         <h3 className='library-playlist-uploader'>Uploader</h3>
      //     </div>
      // </div>