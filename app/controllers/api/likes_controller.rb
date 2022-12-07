class Api::LikesController < ApplicationController
    # wrap_parameters include: Track.attribute_names + ['photo', 'song', 'artistId']
  
      def index
        @likes = Like.where(likes: {user_id: params[:user_id]}).order('created_at DESC')
        render :index
      end

    
      def create
        @like = Like.new(like_params)
        if @like.save
        else
          render json: { errors: ['The provided credentials were invalid.']}, status: 422      
        end
      end
  
      def destroy
        @like = Like.where(track_id: params[:like][:track_id]).where(user_id: params[:like][:user_id])
        @like[0].destroy
      end
    
      private
    
      def like_params
        params.require(:like).permit(:user_id, :track_id)
      end
    end

