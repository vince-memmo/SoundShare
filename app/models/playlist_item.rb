# == Schema Information
#
# Table name: playlist_items
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  playlist_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_playlist_items_on_playlist_id  (playlist_id)
#  index_playlist_items_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (playlist_id => playlists.id)
#  fk_rails_...  (user_id => users.id)
#
class PlaylistItem < ApplicationRecord
    belongs_to :user, foreign_key: :user_id, class_name: :User
    belongs_to :playlist, foreign_key: :user_id, class_name: :Playlist
    
end
