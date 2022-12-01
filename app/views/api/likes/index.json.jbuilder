json.array! @likes do |like|
    track = Track.where(tracks: {id: like.track_id}).first
    json.extract! track, :name, :id, :artist_id
    json.photoUrl track.photo.url
    json.songUrl track.song.url
end