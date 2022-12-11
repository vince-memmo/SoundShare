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
    const [errors, setErrors] = useState([]);
    const user_id = sessionUser.id
    const formType = trackId ? "Update Post" : "Create Post"
    const [loading, setLoading] = useState(false);

    
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

      if (!name) {
        alert('Your song must have a name');
        return;
      }

      if (!photoUrl) {
        alert('Please attach an image file');
        return;
      }

      const allowedImageExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedImageExtensions.exec(photoUrl.name)) {
        alert('Invalid image file type, please upload a .jpeg, .jpg, or, .png');
        return;
      }

      if (!songUrl) {
        alert('Please attach an song file');
        return;
      }

      const allowedSongExtensions = /(\.mp3|\.wav)$/i;
      if (!allowedSongExtensions.exec(songUrl.name)) {
        alert('Invalid song file type, please upload a .mp3 or .wav');
        return;
      }

      setLoading(true)

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
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            setLoading(false)
            data = await res.text(); // Will hit this case if the server is down
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
    }

    const errorMessage = <h3 className="error-message">{`It looks like you've already used that, please chose a different name`}</h3>
    const trackTitle = songUrl ? <p className="track-file-title">{songUrl.name}</p> : <p className="track-file-title">None</p>
    const imageTitle = photoUrl ? <p className="image-file-title">{photoUrl.name}</p> : <p className="track-file-title">None</p>

    return (
      <>
      <div className="track-form-container">
        <div className="track-form-div">
          <section className="track-upload-section">
            <form onSubmit={handleSubmit}>
              <h1 className="upload-title">Upload your track and image here</h1>
              {!trackId && <input id="track-input" type="file" onChange={(e) => setSongUrl(e.currentTarget.files[0])}/>}
              <label for="track-input" className="track-upload" >Choose an audio file</label>
              <div className="file-chosen-div">
                <p className="file-chosen">File chosen:</p>
                {trackTitle}
              </div>
              <input className="photo-upload" id="image-input" type="file" onChange={(e) => setPhotoUrl(e.currentTarget.files[0])}/>
              <label for="image-input" className="image-upload" >Choose an image file</label>
              <div className="file-chosen-div">
                <p className="file-chosen">File chosen:</p>
                {imageTitle}
              </div>
              <div className="track-div">
                <div className="title-span">
                  <p className="track-title">Title</p>
                  <i class="fa-solid fa-asterisk"></i>
                </div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
              </div>
              <input id="track-submit-button" className="track-submit-button" type="submit" ></input>
              <label for="track-submit-button" className="track-submit" >Upload Track</label>
              <ul>
                {errors.map(error => errorMessage)}
              </ul>
              {loading && (<div class="loader"></div>)}


              <div className='audio-files-bio'>
                <p className="audio-files-accepted">Provide MP3, WAV, ALAC, or AIFF for your audio file.   </p>
                <a className="audio-files-link" href="https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements#typeOfFile"> Learn more about lossless HD.</a>
              </div>
              <p className="image-files-accepted">Provide JPEG or PNG for you image file. Use a sqaure image to prevent distortion.</p>

            </form>
          </section>
        </div>
      </div>
      </>
    );
  }
  
  export default TrackForm;