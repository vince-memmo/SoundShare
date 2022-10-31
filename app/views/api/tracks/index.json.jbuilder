# json.tracks do
#     debugger
#     json.extract! @tracks, :id, :name, :audio_url, :image_url, :artist_id
# end

@tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :name, :audio_url, :image_url, :artist_id
    end
end