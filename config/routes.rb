Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create]
    resource :session, only: [:create, :destroy]
    resources :groups, only: [:index, :create, :show, :update]
    resources :events, only: [:index, :show, :update]
    resources :comments, only: [:index, :create, :destroy]
  end
end
