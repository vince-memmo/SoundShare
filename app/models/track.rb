# == Schema Information
#
# Table name: tracks
#
#  id         :bigint           not null, primary key
#  audio_url  :string           not null
#  image_url  :string           not null
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
    validates :audio_url, :image_url, :artist_id, :name, presence:true

    belongs_to :user, foreign_key: :artist_id, class_name: :User
    has_one_attached :song_file
end
