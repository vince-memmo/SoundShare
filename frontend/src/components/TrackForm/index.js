import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { createTrack, updateTrack } from "../../store/tracks";
import { useParams } from "react-router-dom";
import { fetchTrack, getTrack } from "../../store/tracks";
import './TrackUploadPage.css'
import { useHistory } from "react-router-dom";

function TrackForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { trackId } = useParams() 
    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id
    const formType = trackId ? "Update Post" : "Create Post"
    
      let track = {
        name: '',
        artist_id: user_id,
        photoUrl: '',
        songUrl: ''
      }
    
    const [name, setName] = useState()
    const [photoUrl, setPhotoUrl] = useState()
    const [songUrl, setSongUrl] = useState()
    
    const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.append('track[name]', name);
      formData.append('track[artist_id]', user_id)
      if (photoUrl) {
        formData.append('track[photo]', photoUrl);
      }
      if (songUrl) {
        formData.append('track[song]', songUrl);
      }
        dispatch(createTrack(formData))
        .then(newTrack => history.push('/library'))
    }

    return (
      <>
      <body className="track-form-body">
        <form onSubmit={handleSubmit}>
          <h1>"Create Track"</h1>
            <label>
               <input placeholder="track title" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </label>
            <input type="file" onChange={(e) => setPhotoUrl(e.currentTarget.files[0])}/>
            {!trackId && <input type="file" onChange={(e) => setSongUrl(e.currentTarget.files[0])}/>}
            <input type="submit" ></input>
        </form>
      </body>
      </>
    );
  }
  
  export default TrackForm;