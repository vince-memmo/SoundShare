class Api::TracksController < ApplicationController

    def index
      if params[:user_id]
        @tracks = Track.where(tracks: {artist_id: params[:user_id]})
        render :index
      else
        @tracks = Track.all
        render :index
      end
    end
  
    def create
      @track = Track.new(track_params)
      
      if @track.save
        render :show
      else
        render json: { errors: ['The provided credentials were invalid.']}, status: 422      
      end
    end
  
    private
  
    def track_params
      params.require(:track).permit(:name, :audio_url, :image_url, :artist_id)
    end
  end