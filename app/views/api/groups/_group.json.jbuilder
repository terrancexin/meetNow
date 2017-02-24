json.extract! group, :id, :name, :description, :location, :category, :about, :founded
json.member_count group.users.count
json.event_count group.events.count
