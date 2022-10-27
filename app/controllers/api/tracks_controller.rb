class Api::UsersController < ApplicationController

    def index
        @tracks = Track.all
        render json:
    end
  
    def create
      @track = Track.new(user_params)
      
      if @track.save
        render :show
      else
        render json: status: 422
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:name, :audio_url, :image_url)
    end
  end