# == Schema Information
#
# Table name: tracks
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  artist_id  :bigint           not null
#
# Indexes
#
#  index_tracks_on_artist_id  (artist_id)
#  index_tracks_on_name       (name)
#
# Foreign Keys
#
#  fk_rails_...  (artist_id => users.id)
#
class Track < ApplicationRecord
    validates :artist_id, :name, presence:true

    belongs_to :user, foreign_key: :artist_id, class_name: :User
    has_one_attached :photo
    has_one_attached :song
end
