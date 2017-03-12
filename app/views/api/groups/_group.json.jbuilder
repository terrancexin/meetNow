json.extract! group, :id, :name, :description, :location, :category, :about, :founded, :photo_url
json.member_count group.users.length
json.event_count group.events.length
