json.partial! 'api/groups/group', group: @group

json.users do
  @group.users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
