import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { fetchTracks } from "../../store/tracks";
import { getTracks } from "../../store/tracks";
import TrackIndexItem from "../Tracks/TrackIndexItem";
import './DiscoverPage.css'


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
      <div className="discover-content">
        <div className="main-carousels">
          <div className="discover-singles-carousel">
              {tracks.map(track => 
                <TrackIndexItem track={track}/>
                )}
            </div>
        </div>
        <div className="discover-sidebar"></div>
      </div>
      </>
    )
  }
  
  export default DiscoverPage;