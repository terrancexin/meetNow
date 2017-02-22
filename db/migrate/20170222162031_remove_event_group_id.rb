class RemoveEventGroupId < ActiveRecord::Migration[5.0]
  def change
    remove_index :events, :group_id
  end
end
