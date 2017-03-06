json.partial! 'api/users/user', user: @user

# json.user_detail do
#   json.extract! user, :id, :first_name, :last_name, :email, :city, :bio
# end

json.events do
  @user.events.each do |event|
    json.set! event.id do
      json.partial! 'api/events/event', event: event
    end
  end
end
