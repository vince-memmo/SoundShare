import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserTracks, getPlaylists } from "../../store/playlists";
import TrackIndexItem from "./TrackIndexItem";

function Tracks() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(getPlaylists)
    debugger
    const user_id = sessionUser.id
    
    useEffect(() => {
      dispatch(fetchUserPlaylists(user_id))
    }, [dispatch])
  
    return (
      <>
        <h1>{`${sessionUser.username}'s Songs`}</h1>
        <div>
            {playlists.map(track => 
              <>
                <PlayIndexItem playlist={playlist}/>
                {/* <button onClick={() => dispatch(deleteTrack(track.id))}>Delete</button> */}
              </>
              )}
        </div>
      </>
    );
  }
  
  export default Tracks;