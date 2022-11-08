class DropUserIdAddTrackId < ActiveRecord::Migration[7.0]
  def change
    add_reference :playlist_items, :track, foreign_key: true
    remove_column :playlist_items, :user_id
  end
end
