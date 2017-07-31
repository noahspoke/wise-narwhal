class ChangePageIdToInt < ActiveRecord::Migration
  def change
  	remove_column :things, :page_id
  	add_column :things, :page_id, :integer
  end
end
