class RemoveArtistIdIdFromTracks < ActiveRecord::Migration[7.0]
  def change
    remove_column :tracks, :artist_id_id
  end
end
