Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:show, :create]
    resources :memberships, only: [:create]
    resource :memberships, only: [:destroy]
    resources :events, only: [:index, :create]


    resources :groups, except: [:new, :edit]
      # post 'join'
      # resources :events, except: [:new, :edit] do
      # end

  end
end
