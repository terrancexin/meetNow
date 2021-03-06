json.partial! 'api/groups/group', group: @group
json.extract! @group, :longitude, :latitude

json.users do
  @group.users.each do |user|
    json.set! user.id do
      json.name user.first_name
      json.image_url user.image

    end
  end
end

json.events do
  @group.events.each do |event|
    json.set! event.id do
      json.partial! 'api/events/event', event: event
    end
  end
end
