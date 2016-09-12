class RenameTypeToGroupName < ActiveRecord::Migration
  def change
  	rename_column :things, :type, :group_name
  end
end
