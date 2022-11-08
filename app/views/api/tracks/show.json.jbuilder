json.extract! @track, :id, :name, :artist_id
json.photoUrl @track.photo.url
json.songUrl @track.song.url