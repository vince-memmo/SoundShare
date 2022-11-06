# == Schema Information
#
# Table name: playlists
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_playlists_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Playlist < ApplicationRecord
    validates :name, presence:true

    belongs_to :user, foreign_key: :user_id, class_name: :User
    has_one_attached :photo
end
