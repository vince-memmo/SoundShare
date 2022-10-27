class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.string :name, null:false
      t.string :audio_url, null:false
      t.string :image_url, null:false
      t.references :artist_id, null:false, foreign_key: {to_table: :users}

      t.timestamps
    end
    add_index :tracks, :name
  end
end