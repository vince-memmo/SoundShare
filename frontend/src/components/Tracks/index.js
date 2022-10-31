import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTracks } from "../../store/tracks";
import { fetchUserTracks } from "../../store/tracks";

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
        <ul>
          <li>
            {tracks.map(track => 
              track.name
              )}
            <button>Update</button>
            <button>Delete</button>
          </li>
        </ul>
        <Link to={`/${user_id}/upload`}>Add Track</Link>
      </>
    );
  }
  
  export default Tracks;