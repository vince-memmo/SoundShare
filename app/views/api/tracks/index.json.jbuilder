# @tracks.each do |track|
#     json.set! track.id do
#       json.extract! track, :id, :name, :artist_id
#     end
# end
json.array! @tracks do |track|
  json.extract! track, :name, :id, :artist_id
  json.photoUrl track.photo.url
  json.songUrl track.song.url
end