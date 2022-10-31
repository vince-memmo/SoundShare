import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { fetchTracks } from "../../store/tracks";
import { useDispatch } from "react-redux";
import { getTracks } from "../../store/tracks";


function DiscoverPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const tracks = useSelector(getTracks)
    
    useEffect(() => {
        dispatch(fetchTracks())
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />
    
    return (
      <>
      <ul>
        {
          tracks.map(track => 
            track.name
          )
        }
      </ul>
      </>
    )
  }
  
  export default DiscoverPage;