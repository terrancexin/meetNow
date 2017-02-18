# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Group.destroy_all
Event.destroy_all
Comment.destroy_all
Membership.destroy_all
Organizer.destroy_all
Rsvp.destroy_all

user1 = User.create!(username: "Terrance", password: "123abc", first_name: 'Terrance', last_name: 'X', email: 'txin@meetnow.com', city: 'nyc')
user2 = User.create!(username: "AppAcademy", password: "123abc", first_name: "App", last_name: "Academy", email: 'appacademy@meetnow.com')
user3 = User.create!(username: "user3", password: "123abc", first_name: "User", last_name: "3", email: 'user3@meetnow.com')

group1 = Group.create!(name: "Group1", description: "terrance group", category: "tech", about: "first group", location: "NYC")
group2 = Group.create!(name: "Group2", description: "appacademy group", category: "dance", about: "second group", location: "LA")
group3 = Group.create!(name: "Group3", description: "group 3", category: "fitness", location: 'SF')

event1 = Event.create!(name: "Event1", time: Faker::Time.forward(60), location: 'NYC', description: 'terrance event', group_id: group1.id)
event2 = Event.create!(name: "Event2", time: Faker::Time.forward(60), location: 'LA', description: 'appacademy event', group_id: group2.id)
event3 = Event.create!(name: "Event3", time: Faker::Time.forward(60), location: 'SF', description: 'event 3', group_id: group3.id)

comment1 = Comment.create!(body: "comment 1", user_id: user1.id, event_id: event1.id)
comment2 = Comment.create!(body: "comment 2", user_id: user2.id, event_id: event2.id)
comment3 = Comment.create!(body: "comment 3", user_id: user1.id, event_id: event1.id)

Organizer.create!(user_id: user1.id, group_id: group1.id)
Membership.create!(user_id: user1.id, group_id: group1.id)
Membership.create!(user_id: user2.id, group_id: group1.id)
Membership.create!(user_id: user3.id, group_id: group1.id)

Organizer.create!(user_id: user2.id, group_id: group2.id)
Membership.create!(user_id: user2.id, group_id: group2.id)
Membership.create!(user_id: user3.id, group_id: group2.id)

rsvp1 = Rsvp.create!(user_id: user1.id, event_id: event1.id)
rsvp2 = Rsvp.create!(user_id: user2.id, event_id: event1.id)
rsvp3 = Rsvp.create!(user_id: user1.id, event_id: event2.id)
rsvp4 = Rsvp.create!(user_id: user3.id, event_id: event3.id)
rsvp5 = Rsvp.create!(user_id: user1.id, event_id: event3.id)
