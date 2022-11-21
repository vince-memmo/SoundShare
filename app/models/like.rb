# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  track_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_likes_on_track_id  (track_id)
#  index_likes_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (track_id => tracks.id)
#  fk_rails_...  (user_id => users.id)
#
class Like < ApplicationRecord
    belongs_to :track, foreign_key: :track_id, class_name: :Track
    belongs_to :user, foreign_key: :user_id, class_name: :User  
end
