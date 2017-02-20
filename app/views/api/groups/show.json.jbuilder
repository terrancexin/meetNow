json.partial! 'api/groups/group', group: @group

json.events do
  @group.events.each do |event|
    json.set! event.id do
      json.partial! 'api/events/event', event: event
    end
  end
end

json.users do
  @group.users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
