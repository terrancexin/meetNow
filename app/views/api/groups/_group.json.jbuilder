json.extract! group, :id, :name, :description, :location, :category, :about, :founded
json.member_count group.users.length
json.event_count group.events.length
