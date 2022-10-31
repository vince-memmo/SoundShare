import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { createTrack } from "../../store/tracks";

function TrackForm() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id
    const track = {
      name: '',
      audio_url: '',
      image_url: '',
      artist_id: user_id
    }

    const [name, setName] = useState(track.name)
    const [audio_url, setAudio] = useState(track.audio_url)
    const [image_url, setImage] = useState(track.image_url)
    
    useEffect(() => {
    //   dispatch(fetchTrack(user_id))
    }, [dispatch])

    const handleSubmit = (e) => {
      e.preventDefault()
      const newTrack = {
          ...track,
          name,
          audio_url,
          image_url
      }
      dispatch(createTrack(newTrack))
  }
  
    return (
      <>
        <h1>Track Upload Page for {sessionUser.uername}</h1>
        <form onSubmit={handleSubmit}>
            <label>
               <input placeholder="track title" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </label>
            <label>
               <input placeholder="track audio url" type="text" value={audio_url} onChange={(e) => setAudio(e.target.value)}></input>
            </label>
            <label>
               <input placeholder="track image url" type="text" value={image_url} onChange={(e) => setImage(e.target.value)}></input>
            </label>
            <input type="submit" ></input>
        </form>
      </>
    );
  }
  
  export default TrackForm;