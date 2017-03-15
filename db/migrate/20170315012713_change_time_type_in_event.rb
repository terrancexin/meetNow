class ChangeTimeTypeInEvent < ActiveRecord::Migration[5.0]
  def change
    remove_column :events, :time
    add_column :events, :time, :integer
  end
end
