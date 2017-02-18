class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.datetime :time, null: false
      t.string :location, null: false
      t.text :description, null: false
      t.integer :group_id, null: false
      t.float :lat
      t.float :lng

      t.timestamps
    end

    add_index :events, :group_id, unique: true
  end
end
