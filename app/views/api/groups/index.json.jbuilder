@groups.each do |group|
  json.set! group.id do
    json.partial! 'group', group: group

    json.users do
      group.users.each do |user|
        json.set! user.id do
          json.partial! 'api/users/user', user: user
        end
      end
    end
  end
end
