# @tracks.each do |track|
#     json.set! track.id do
#       json.extract! track, :id, :name, :audio_url, :image_url, :artist_id
#     end
# end

json.array! @tracks do |track|
  json.extract! track, :name
  json.photoUrl track.song_file.url
end