class AddPhotoToGroup < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :photo_url, :string
  end
end
