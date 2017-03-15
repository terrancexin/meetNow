class ChangeColumnTypeInEvent < ActiveRecord::Migration[5.0]
  def self.up
    change_column :events, :time, :datetime
  end

  def self.down
    change_column :events, :time, :integer
  end
end
