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
    const [previewUrl, setPreviewUrl] = useState('')

    
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
    const [name, setName] = useState()
    const [photoUrl, setPhotoUrl] = useState(null)

    const updateImage = async (e) => {
      e.preventDefault()
      setPhotoUrl(e.target.files[0])
      if (e.target.files[0]) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
      }
    };

    
    // const [songUrl, setSongUrl] = useState()
    
    useEffect(() => {
      setName(track.name)
      setPhotoUrl(track.photoUrl)
    //   setSongUrl(track.songUrl)
    },[track])
    
    const handleSubmit = (e) => {
      e.preventDefault()

      if (photoUrl && previewUrl) {
        // debugger
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

    const deleteCurrentTrack = () => {
      if (window.confirm("Are you sure? Deleting a track is irreversible.")) {
        dispatch(deleteTrack(trackId))
        history.push('/library')
      };
    }

    const errorMessage = <h3 className="error-message">{`It looks like you've already used that song title, please chose a different name`}</h3>
    const imageTitle = photoUrl ? <p className="image-file-title">{photoUrl.name}</p> : <p className="track-file-title">None</p>
    // debugger
    const photoPreview = previewUrl ? <img className='preview-image' src={previewUrl} alt="" /> : <img className='preview-image' src={track.photoUrl} alt="" /> 
    
    return (
      <>
      <div className="track-form-container">
        <div className="track-form-div">
          <section className="track-upload-section">
            <form onSubmit={handleSubmit}>
              <h1 className="upload-title">Change your track's image and/or title here</h1>
              <input className="photo-upload" id="image-input" type="file" onChange={updateImage}/>
              <label for="image-input" className="image-upload" >Choose an image file</label>
              <div className="file-chosen-div">
                <p className="file-chosen">File chosen:</p>
                {imageTitle}
              </div>
              {photoPreview}
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
              <p className="image-files-accepted">Provide JPEG or PNG for you image file. Use a sqaure image to prevent distortion.</p>

            </form>
          </section>
        </div>
        <div onClick={() => deleteCurrentTrack()}>Delete Track</div>
      </div>
      </>
    );
  }
  
  export default TrackForm;