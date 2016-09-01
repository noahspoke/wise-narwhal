class AddPasswordDigest < ActiveRecord::Migration
  def change
  	drop_table :showtimes
  	drop_table :posts
  	drop_table :the_times
  	remove_column :users, :code
  	add_column :users, :password_digest, :string
  end
end
