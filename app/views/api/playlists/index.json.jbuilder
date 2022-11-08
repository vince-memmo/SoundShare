json.array! @playlists do |playlist|
    json.extract! playlist, :name, :id, :user_id
    json.photoUrl playlist.photo.url
end