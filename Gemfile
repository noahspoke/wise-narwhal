source "https://rubygems.org"

gem 'sinatra'
gem 'sinatra-reloader'
gem 'sass'
gem 'thin'
gem 'activerecord'
gem 'sinatra-activerecord'
gem 'rake'
gem 'bcrypt'

#Tells your Mac to use sqlite locally during development
group :development do
 gem 'sqlite3'
 gem "tux"
end

#Tells heroku to use postgreSQL in production/live
group :production do
 gem 'pg'
end