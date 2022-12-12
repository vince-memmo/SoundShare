# SoundShare

<img width="1340" alt="Screen Shot 2022-12-11 at 7 06 16 PM" src="https://user-images.githubusercontent.com/110570521/206952172-dc91c2cf-6cb9-4557-b601-356a556906f3.png">


## Background

SoundShare is a clone of the audio sharing and streaming website SoundCloud. On SoundShare, every user is an artist that can upload their own songs (full CRUD functionality), as well as make playlists, view other users' playlists and songs, and like songs.

Live Site: https://soundshare.onrender.com/

## Backend - Ruby on Rails

SoundShare's PostgreSQL database is set-up using the Rails framework to make relationtional tables and joins tables. The MVC architectural pattern is used to connect the backend to the user interface. 

When creating a track, FormData is sent from the frontend to the tracks controller where a new track is saved to the Tracks table.

```
# Tracks Controller

    def create
      @track = Track.new(track_params)
      if @track.save
        render :show
      else
        render json: { errors: ['The provided credentials were invalid.']}, status: 422      
      end
    end
  ```
  
  Utilizing JBuilder in the Track Index View allows for the necessary information to be sent back to the front end.
  
  ```
  # Track Index View
     json.array! @tracks do |track|
      json.extract! track, :name, :id, :artist_id
      json.artist User.find(track[:artist_id]).username
      json.photoUrl track.photo.url
      json.songUrl track.song.url
    end
  ```
  
  FormData is used to allow the Song and Photo Url to be uploaded to AWS S3 and attached to the track in the track table. Below is an example of attaching an mp3 and jpeg directly to a track in the seeds file.
  
  ```
  # Seeds File
  
       track4 = Track.create!(name: "Waters of March", artist_id: 2)
      image_file4 = URI.open('https://soundshare-vmemmo-dev.s3.us-west-1.amazonaws.com/AntonioCarlosJobim.jpeg')
      track4.photo.attach(io: image_file4, filename: 'AntonioCarlosJobim.jpeg')
      audio_file4 = URI.open('https://soundshare-vmemmo-dev.s3.us-west- 1.amazonaws.com/Waters+of+March++guas+de+Maro++Stereo++Elis+Regina+and+Tom+Jobim++Aguas+de+Marco+.mp3')
      track4.song.attach(io: audio_file4, filename: 'Waters+of+March++guas+de+Maro++Stereo++Elis+Regina+and+Tom+Jobim++Aguas+de+Marco+.mp3')
 ```
 
 Lastly, a ```hash_one_attached``` relationship must be made in the track model, in order for an AWS S3 file to be associated with a track
 
 ```
 # Track Model
 class Track < ApplicationRecord
    validates :artist_id, :name, presence:true
    validates :name, uniqueness: { scope: :artist_id }


    belongs_to :user, foreign_key: :artist_id, class_name: :User
    has_many :playlist_items, foreign_key: :track_id, class_name: :PlaylistItem, dependent: :destroy
    has_many :likes, foreign_key: :track_id, class_name: :Like, dependent: :destroy

    has_one_attached :photo
    has_one_attached :song
end
```

## Frontend - React-Redux/Javascript

The React-Redux store is utilizied to collect data from the backend and pass it to the frontend in order to create a smaller, dynamic version of the database that is accessible in the frontend, and used to render the required information for that page. Below is an example of the store on the discover page. Playlists, Likes, and Tracks were all fetched from the backend using AJAX and Redux Thunk Middleware. The useEffect React hook was used to initiate this process upon a page refresh.

![Screen Shot 2022-12-11 at 7 36 41 PM](https://user-images.githubusercontent.com/110570521/206955303-21f2555f-d459-4869-909e-1d8ba35a6fa3.png)

```
# Discover Page Component

    useEffect(() => { 
      dispatch(fetchTracks())
      dispatch(fetchPlaylists())
      dispatch(fetchUserLikes(user_id))
    }, [dispatch])
```

```
# Track Store

  #Thunk Action for a Backend Fetch

export const fetchTracks = () => async (dispatch) => {
    const response = await csrfFetch('/api/tracks');
    if (response.ok) {
      const tracks = await response.json();
      dispatch(receiveTracks(tracks));
    }
}

 #Reducer used to put the tracks information in the redux store

const tracksReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRACKS:
      return { ...action.tracks };
    case RECEIVE_TRACK:
      return { ...state, [action.track.id]: action.track };
    case REMOVE_TRACK:
      const newState = { ...state };
      delete newState[action.trackId];
      return newState;
    default:
      return state;
  }
}

```


 
