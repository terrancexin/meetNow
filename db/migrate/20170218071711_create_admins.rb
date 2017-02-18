class CreateAdmins < ActiveRecord::Migration[5.0]
  def change
    create_table :admins do |t|
      t.integer :user_id, null: true
      t.integer :group_id, null: true

      t.timestamps
    end
  end
end
