require 'sinatra'
require 'sass/plugin/rack'
require 'bundler/setup'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require './config/enviroments'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

class User < ActiveRecord::Base
	has_secure_password
end

class Page < ActiveRecord::Base
end 

class Thing < ActiveRecord::Base
end

enable :sessions

helpers do
	def element_type(type)
		element = case type
			when "h1" then "_h1"
			when "a" then "_a"
			when "p" then "_p"
			when "strong" then "_strong"
			when "img" then "_img"
			else false
		end

		return element
	end
end

get '/' do
	erb :index
end

get '/admin' do
	erb :login
end

post '/admin' do
	user = User.find_by(name: params[:name])
	if user.authenticate(params[:password])
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
	page_name = params[:name]
	underscored = page_name.split.join('_')

	page = Page.create(name: underscored)
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

get '/:page_name' do
	@page = Page.find_by(name: params[:page_name])
	@things = Thing.where("name = ?", params[:page_name]).order(:id)
	erb :page
end

after do
	ActiveRecord::Base.clear_active_connections!
end