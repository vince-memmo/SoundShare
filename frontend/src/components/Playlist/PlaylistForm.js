import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { createTrack, updateTrack } from "../../store/tracks";
import { useParams } from "react-router-dom";
import { fetchTrack, getTrack } from "../../store/tracks";
import { createPlaylist } from "../../store/playlist";

function PlaylistForm() {
    const dispatch = useDispatch()
    const { trackId } = useParams() 
    const sessionUser = useSelector(state => state.session.user);
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
      const formData = new FormData();
      formData.append('track[name]', name);
      formData.append('track[user_id]', user_id)
      if (photoUrl) {
        formData.append('track[photo]', photoUrl);
      }
        dispatch(createPlaylist(formData))
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