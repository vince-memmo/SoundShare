class Api::PlaylistItemsController < ApplicationController
    wrap_parameters include: Track.attribute_names + ['photo', 'song', 'artistId']
  
      def index
        params[:playlist_id]
        @playlist_items = PlaylistItem.where(playlist_items: {playlist_id: params[:playlist_id]})
        render :index
      end
  
      def show
        @track = Track.find(params[:id])
        render :show
      end
  
      def update
        @track = Track.find(params[:id])
        @track.name = params[:track][:name]
        if params[:track][:photo]
          file = File.open(params[:track][:photo])
          @track.photo.attach(io: file, filename: "updated song")
        end
        if @track.save
          render :show
        else
          render json: @track.errors.full_messages, status: 422
        end
      end
    
      def create
        @playlist_item = PlaylistItem.new(playlist_item_params)
        if @playlist_item.save
        else
          render json: { errors: ['The provided credentials were invalid.']}, status: 422      
        end
      end
  
      def destroy
        @playlistItem = PlaylistItem.where(track_id: params[:id]).where(playlist_id: params[:playlist_id])
        @playlistItem[0].destroy
      end
    
      private
    
      def playlist_item_params
        params.require(:playlist_item).permit(:playlist_id, :track_id)
      end
    end