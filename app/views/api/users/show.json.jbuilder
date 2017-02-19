json.partial! 'api/users/user', user: @user

json.events do
  @user.events.each do |event|
    json.set! event.id do
      json.partial! 'api/events/event', event: event
    end
  end
end
