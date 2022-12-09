import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTracks } from "../../store/tracks";
import { fetchUserTracks, deleteTrack } from "../../store/tracks";
import TrackIndexLibrary from "../Tracks/TrackIndexLibrary";
import './TracksLibrary.css'
import { getLikes } from '../../store/likes';
import { fetchUserLikes } from "../../store/likes";


function PlaylistLibrary() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const tracks = useSelector(getTracks)
  const user_id = sessionUser.id
  const likes = useSelector(state => state.likes);
  
  useEffect(() => {
    dispatch(fetchUserTracks(user_id))
    dispatch(fetchUserLikes(user_id))
  }, [dispatch])

  return (
    <>
    <p className="update-title">Click on a song title to update your song</p>
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
  
  export default PlaylistLibrary;