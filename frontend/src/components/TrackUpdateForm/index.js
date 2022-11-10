import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { createTrack, updateTrack } from "../../store/tracks";
import { useParams } from "react-router-dom";
import { fetchTrack, getTrack } from "../../store/tracks";
import './TrackUpdateForm.css'
import { deleteTrack } from "../../store/tracks";

function TrackForm() {
    const dispatch = useDispatch()
    const { trackId } = useParams() 
    const sessionUser = useSelector(state => state.session.user);
    let track = useSelector(getTrack(trackId))
    const user_id = sessionUser.id
    const formType = trackId ? "Update Post" : "Create Post"
    
    useEffect(() => {
      dispatch(fetchTrack(trackId))
    }, [dispatch])

    
    if (!track) {
      track = {
        name: '',
        // artist_id: user_id,
        photoUrl: '',
        // songUrl: ''
      }
    }

    if (track) {
        track.photoUrl = null
    }
    
    const [name, setName] = useState()
    const [photoUrl, setPhotoUrl] = useState(null)
    // const [songUrl, setSongUrl] = useState()
    
    useEffect(() => {
      setName(track.name)
      setPhotoUrl(track.photoUrl)
    //   setSongUrl(track.songUrl)
    },[track])
    
    const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.append('track[name]', name);
      formData.append('track[artist_id]', user_id)
      if (photoUrl) {
        formData.append('track[photo]', photoUrl);
      }
      if (formType === "Create Post") {
        dispatch(createTrack(formData))
      } else {
        dispatch(updateTrack(formData, track.id))
      }
    }

    return (
      <>
      <div className="song-update-form-div">
        <form onSubmit={handleSubmit}>
          <h1>{formType}</h1>
            <label>
               <input placeholder="track title" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </label>
            <input type="file" onChange={(e) => setPhotoUrl(e.currentTarget.files[0])}/>
            {/* {!trackId && <input type="file" onChange={(e) => setSongUrl(e.currentTarget.files[0])}/>} */}
            <input type="submit" ></input>
        </form>
        <button className="delete-song" onClick={() => dispatch(deleteTrack(trackId))}>Delete Song</button>
      </div>
      </>
    );
  }
  
  export default TrackForm;