class CreateThings < ActiveRecord::Migration
  def change
  	create_table :things do |t|
  		t.string :type, null: false
  		t.string :name, null: false
  		t.string :description, null: false
  		t.timestamps
  	end
  end
end
