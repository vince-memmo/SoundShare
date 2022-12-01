import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTracks } from "../../store/tracks";
import LikesIndexLibrary from "../Likes/LikesIndexLibrary";
import './TracksLibrary.css'
import { fetchUserLikes } from "../../store/likes";

function LikesLibrary() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const tracks = useSelector(getLikes)
  const user_id = sessionUser.id
  
  useEffect(() => {
    dispatch(fetchUserLikes(user_id))
  }, [dispatch])

  return (
    <>
      <div className='track-index-library-grid'>
          {tracks.map(track => 
            <>
              <LikesIndexLibrary track={track}/>
            </>
            )}
      </div>
    </>
  );
  }
  
  export default LikesLibrary;