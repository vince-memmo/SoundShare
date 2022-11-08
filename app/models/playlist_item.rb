# == Schema Information
#
# Table name: playlist_items
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  playlist_id :bigint           not null
#  track_id    :bigint
#
# Indexes
#
#  index_playlist_items_on_playlist_id  (playlist_id)
#  index_playlist_items_on_track_id     (track_id)
#
# Foreign Keys
#
#  fk_rails_...  (playlist_id => playlists.id)
#  fk_rails_...  (track_id => tracks.id)
#
class PlaylistItem < ApplicationRecord
    belongs_to :track, foreign_key: :track_id, class_name: :Track
    belongs_to :playlist, foreign_key: :playlist_id, class_name: :Playlist  
end
