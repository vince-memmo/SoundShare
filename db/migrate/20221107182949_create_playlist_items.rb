class CreatePlaylistItems < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_items do |t|
      t.references :user, null:false, foreign_key: true
      t.references :playlist, null:false, foreign_key: true
      t.timestamps
    end
  end
end
