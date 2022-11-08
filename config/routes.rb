Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do

    resources :users, only: :create do
      resources :tracks, only: [:index]
      resources :playlists, only: [:index]
      resources :playlist_items, only: [:index]
    end

    resource :session, only: [:show, :create, :destroy]
    resources :tracks, only: [:index, :create, :destroy, :show, :edit, :update]
    resources :playlists, only: [:index, :create, :destroy, :show, :edit, :update] do
      resources :playlist_items, only: [:index]
    end
    resources :playlist_items, only: [:index, :create, :destroy, :show, :edit, :update]


  end

  get '*path', to: "static_pages#frontend_index"
end
