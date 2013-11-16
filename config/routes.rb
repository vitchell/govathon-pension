GovathonPension::Application.routes.draw do

  root 'home#index'

  get '/test'     =>  "home#test"
  get '/test2'    =>  "home#test2"
  get '/test3'    =>  "home#test3"
  get '/test4'    =>  "home#test4"
  get '/test5'    =>  "home#test5"

end
