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
    }

    return (
      <>
      <body className="track-form-body">
        <form onSubmit={handleSubmit}>
          <h1>"Create Playlist"</h1>
            <label>
               <input placeholder="playlist title" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </label>
            <input type="file" onChange={(e) => setPhotoUrl(e.currentTarget.files[0])}/>
            <input type="submit" ></input>
        </form>
      </body>
      </>
    );
  }
  
  export default PlaylistForm;