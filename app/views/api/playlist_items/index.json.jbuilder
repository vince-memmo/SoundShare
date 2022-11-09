json.array! @playlist_items do |playlist_item|
    json.extract! playlist_item, :id, :track_id, :playlist_id
end