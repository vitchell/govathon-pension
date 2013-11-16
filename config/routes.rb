GovathonPension::Application.routes.draw do

  root 'home#index'

  get '/test'     =>  "home#test"

end
