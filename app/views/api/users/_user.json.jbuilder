json.extract! user, :id, :username, :email, :first_name, :last_name, :city, :bio
json.image_url asset_path(user.image.url)

json.groups do
  user.groups.each do |group|
    json.set! group.id do
      json.partial! 'api/groups/group.json', group: group
    end
  end
end
