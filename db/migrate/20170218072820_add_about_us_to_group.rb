class AddAboutUsToGroup < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :about, :string
    add_column :groups, :location, :string
    add_column :groups, :founded, :datetime

    drop_table :admins
  end
end
