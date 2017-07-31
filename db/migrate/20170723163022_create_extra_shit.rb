class CreateExtraShit < ActiveRecord::Migration
  def change
  	create_table :shows do |t|
  		t.string :title, null: false
  		t.string :description
  		t.string :adt_notes
  		t.string :runtime, null: false
  		t.string :rating, null: false
  		t.string :image_url
  	end

  	create_table :showtimes do |t|
  		t.string :thetime, null: false
  		t.datetime :beg_date, null: false
  		t.datetime :end_date, null: false
  	end

  	create_table :prices do |t|
  		t.string :name, null: false
  		t.integer :price, null: false
  		t.string :description
  	end

  	add_column :things, :beg_date, :datetime
  	add_column :things, :end_date, :datetime

  	rename_column :things, :group_name, :page_id
  end
end
