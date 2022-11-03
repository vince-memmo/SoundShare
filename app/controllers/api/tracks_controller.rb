class Api::TracksController < ApplicationController
  wrap_parameters include: Track.attribute_names + ['photo', 'song', 'artistId']

    def index
      if params[:user_id]
        @tracks = Track.where(tracks: {artist_id: params[:user_id]})
        render :index
      else
        @tracks = Track.all
        render :index
      end
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
      @track = Track.new(track_params)
      if @track.save
        render :show
      else
        render json: { errors: ['The provided credentials were invalid.']}, status: 422      
      end
    end

    def destroy
      @track = Track.find_by(id: params[:id])
      @track.destroy
    end
  
    private
  
    def track_params
      params.require(:track).permit(:name, :artist_id, :photo, :song)
    end
  end