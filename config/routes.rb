GovathonPension::Application.routes.draw do

  root 'home#index'

  get '/presentation1'    =>  "home#presentation1"
  get '/presentation2'    =>  "home#presentation2"
  get '/presentation3'    =>  "home#presentation3"
  get '/presentation4'    =>  "home#presentation4"
  get '/presentation5'    =>  "home#presentation5"
  get '/presentation6'    =>  "home#presentation6"
  get '/presentation7'    =>  "home#presentation7"
  get '/presentation8'    =>  "home#presentation8"
  get '/presentation9'    =>  "home#presentation9"
  get '/presentation10'   =>  "home#presentation10"

end
