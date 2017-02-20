class RemoveMemberCountFromGroup < ActiveRecord::Migration[5.0]
  def change
    remove_column :groups, :member_count
  end
end
