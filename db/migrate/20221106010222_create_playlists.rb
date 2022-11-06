class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :name, null:false
      t.references :user, null:false, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
