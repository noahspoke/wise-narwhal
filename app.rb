require 'sinatra'
require 'sass/plugin/rack'
require 'bundler/setup'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require './db-config'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

class Thing < ActiveRecord::Base
end

get '/' do
	erb :index
end

after do
	ActiveRecord::Base.clear_active_connections!
end