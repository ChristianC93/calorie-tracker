Rails.application.routes.draw do
  
  resources :user_meals
  resources :exercises
  resources :meals
  resources :users, only: [:create, :show, :index]
  resources :users do 
    resources :meals
  end
  
 
  post "/signup", to: "users#create"
  get "/my-page", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
