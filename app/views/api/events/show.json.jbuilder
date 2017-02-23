json.partial! 'api/events/event', event: @event

# json.set! @event.id do
#   json.partial! 'event', event: @event
#   json.rsvp_count event.users.count
# end


json.users do
  @event.users.each do |user|
    json.set! user.id do
      json.name user.first_name
    end
  end
end

json.set! json.rsvp_count @event.users.count
