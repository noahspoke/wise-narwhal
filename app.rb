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

class Thing < ActiveRecord::Base
end

get '/' do
	erb :index
end

get '/admin' do
	erb :login
end

post '/admin' do
	if user = User.find_by(password: params[:password])
		session[:user_id] = user.id
		redirect '/dashboard'
	else
		redirect '/admin'
	end
end

get '/dashboard' do
	if session[:user_id]
		@things = Thing.find_all
		erb :admin
	else
		redirect '/admin'
	end
end

after do
	ActiveRecord::Base.clear_active_connections!
end