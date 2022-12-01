class Api::LikesController < ApplicationController
    # wrap_parameters include: Track.attribute_names + ['photo', 'song', 'artistId']
  
      def index
        @likes = Like.where(likes: {user_id: params[:user_id]})
        render :index
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
        @like = Like.new(like_params)
        if @like.save
        else
          render json: { errors: ['The provided credentials were invalid.']}, status: 422      
        end
      end
  
      def destroy
        @track = Track.find_by(id: params[:id])
        @track.destroy
      end
    
      private
    
      def like_params
        params.require(:like).permit(:user_id, :track_id)
      end
    end