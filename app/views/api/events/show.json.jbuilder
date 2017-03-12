json.partial! 'api/events/event', event: @event

json.set! json.rsvp_count @event.users.count



json.users do
  @event.users.each do |user|
    json.set! user.id do
      json.image_url user.image
    end
  end
end
