class AddMemberCountsToGroup < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :member_count, :integer, default: 1
  end
end
