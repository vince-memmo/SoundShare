import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { createTrack, updateTrack } from "../../store/tracks";
import { useParams } from "react-router-dom";
import { fetchTrack, getTrack } from "../../store/tracks";
import './TrackUpdateForm.css'
import { deleteTrack } from "../../store/tracks";
import { useHistory } from "react-router-dom";

function TrackForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { trackId } = useParams() 
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
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

      if (photoUrl) {
        const allowedImageExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedImageExtensions.exec(photoUrl.name)) {
          alert('Invalid image file type, please upload a .jpeg, .jpg, or, .png');
          return;
        }
      }

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
        .then(newTrack => history.push('/library'))
        .catch(async (res) => {
          let data;
          try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
          } catch {
            data = await res.text(); // Will hit this case if the server is down
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
      }
    }

    const errorMessage = <h3 className="error-message">{`It looks like you've already used that song title, please chose a different name`}</h3>
    const imageTitle = photoUrl ? <p className="image-file-title">{photoUrl.name}</p> : <p className="track-file-title">None</p>

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
            <ul>
              {errors.map(error => errorMessage)}
            </ul>
        </form>
        <button className="delete-song" onClick={() => dispatch(deleteTrack(trackId))}>Delete Song</button>
      </div>
      </>
    );
  }
  
  export default TrackForm;