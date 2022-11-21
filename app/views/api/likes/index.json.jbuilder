json.array! @likes do |like|
    json.extract! like, :id, :user_id, :track_id
end