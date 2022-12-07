json.array! @tracks do |track|
  json.extract! track, :name, :id, :artist_id
  json.artist User.find(track[:artist_id]).username
  json.photoUrl track.photo.url
  json.songUrl track.song.url
end