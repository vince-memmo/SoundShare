import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTracks } from "../../store/tracks";
import { fetchUserTracks, deleteTrack } from "../../store/tracks";
import TrackIndexLibrary from "../Tracks/TrackIndexLibrary";
import './TracksLibrary.css'

function PlaylistLibrary() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const tracks = useSelector(getTracks)
  const user_id = sessionUser.id
  
  useEffect(() => {
    dispatch(fetchUserTracks(user_id))
  }, [dispatch])

  return (
    <>
      <div className='track-index-library-grid'>
          {tracks.map(track => 
            <>
              <TrackIndexLibrary track={track}/>
            </>
            )}
      </div>
    </>
  );
  }
  
  export default PlaylistLibrary;