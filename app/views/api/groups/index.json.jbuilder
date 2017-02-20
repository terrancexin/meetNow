@groups.each do |group|
  json.set! group.id do
    json.partial! 'group', group: group
    json.member_count group.users.count

  end
end
