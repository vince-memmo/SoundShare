json.array! @playlists do |playlist|
    json.extract! playlist, :name, :id, :user_id
    json.artist User.find(playlist[:user_id]).username
    json.photoUrl playlist.photo.url
end