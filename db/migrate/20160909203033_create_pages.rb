class CreatePages < ActiveRecord::Migration
  def change
  	create_table :pages do |t|
  		t.string :name, null: false
  		t.timestamps
  	end
  end
end
