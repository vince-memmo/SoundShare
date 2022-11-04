import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTracks } from "../../store/tracks";
import { fetchUserTracks } from "../../store/tracks";
import TrackIndexItem from "./TrackIndexItem";

function Tracks() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const tracks = useSelector(getTracks)
    const user_id = sessionUser.id
    
    useEffect(() => {
      dispatch(fetchUserTracks(user_id))
    }, [dispatch])
  
    return (
      <>
        <h1>{`${sessionUser.username}'s Songs`}</h1>
        <div>
            {tracks.map(track => 
              <TrackIndexItem track={track}/>
              )}
        </div>
      </>
    );
  }
  
  export default Tracks;