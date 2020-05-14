Rails.application.routes.draw do
  
  post 'sessions/create'
  delete 'sessions/destroy'
  resources :users
  resources :trees do 
    resources :notes 
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
