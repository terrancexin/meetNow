Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create] do
      get 'groups'
    end

    resource :session, only: [:create, :destroy]

    resources :groups, except: [:new, :edit] do
      resources :events, except: [:new, :edit] do
      end
    end

  end
end
