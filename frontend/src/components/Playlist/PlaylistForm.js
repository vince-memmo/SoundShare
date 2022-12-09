import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { createTrack, updateTrack } from "../../store/tracks";
import { useParams } from "react-router-dom";
import { fetchTrack, getTrack } from "../../store/tracks";
import { createPlaylist } from "../../store/playlist";
import { useHistory } from "react-router-dom";

function PlaylistForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { trackId } = useParams() 
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const user_id = sessionUser.id

    
      let track = {
        name: '',
        user_id: user_id,
        photoUrl: '',
      }
    
    const [name, setName] = useState()
    const [photoUrl, setPhotoUrl] = useState()
    
    const handleSubmit = (e) => {
      e.preventDefault()

      if (!photoUrl) {
        alert('Please attach an image file');
        return;
      }

      const allowedImageExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedImageExtensions.exec(photoUrl.name)) {
        alert('Invalid image file type, please upload a .jpeg, .jpg, or, .png');
        return;
      }

      const formData = new FormData();
      formData.append('playlist[name]', name);
      formData.append('playlist[user_id]', user_id)
      if (photoUrl) {
        formData.append('playlist[photo]', photoUrl);
      }
        dispatch(createPlaylist(formData))
        .then(newPlaylist => history.push('/library'))
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

    const errorMessage = <h3 className="error-message">{`It looks like you've already used that playlist name, please chose a different name`}</h3>

    return (
      <>
      <div className="track-form-container">
        <div className="track-form-div">
          <section className="track-upload-section">
            <form onSubmit={handleSubmit}>
                  <h1 className="upload-title">Create your playlist here</h1>
                  <input type="file" className="photo-upload" id="image-input" onChange={(e) => setPhotoUrl(e.currentTarget.files[0])}/>
                  <label for="image-input" className="image-upload" >Choose an image file</label>
                  <div className="file-chosen-div">
                    <p className="file-chosen">File chosen:</p>
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
                  <p className="image-files-accepted">Provide JPEG or PNG for you image file. Use a sqaure image to prevent distortion.</p>
            </form>
          </section>
        </div>
      </div>
      </>
    );
  }
  
  export default PlaylistForm;