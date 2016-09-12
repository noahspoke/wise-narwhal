require 'sinatra'
require 'sass/plugin/rack'
require 'bundler/setup'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require './db-config'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

class User < ActiveRecord::Base
	has_secure_password
end

class Page < ActiveRecord::Base
end 

class Thing < ActiveRecord::Base
end

get '/' do
	erb :index
end

get '/admin' do
	erb :login
end

post '/admin' do
	if user = User.find(name: params[:name]).authenticate(params[:password])
		session[:user_id] = user.id
		redirect '/dashboard'
	else
		redirect '/admin'
	end
end

get '/dashboard' do
	if session[:user_id]
		@pages = Page.find_each
		erb :admin
	else
		redirect '/admin'
	end
end

post '/page' do
	page = Page.create(name: params[:name])
	status 200
	body ''
end

post '/page/thing' do
	thing = Thing.create(name: params[:name], group_name: params[:type], description: params[:desc])
	status 200
	body ''
end

post '/user' do
	user = User.create(name: params[:name], password: params[:password])
	status 200
	body ''
end

post '/thing/:thing_id' do
	thing = Thing.find(params[:thing_id])
	thing.update_attribute :description, params[:description] if params[:description]
	status 200
	body ''
end

after do
	ActiveRecord::Base.clear_active_connections!
end