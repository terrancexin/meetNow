json.extract! event, :id, :name, :time, :location, :description, :group_id, :lat, :lng
if event.users.length == 0
  json.guys ({})
else
  json.guys do
    event.users.each do |user|
      json.set! user.id do
        json.extract! user, :id, :first_name
      end
    end
  end
end
