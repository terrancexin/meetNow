# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
USER_PHOTOS = []
users_idx = 1
while users_idx <= 99 do
    USER_PHOTOS.push("https://s3.amazonaws.com/meetnow-DEV/users/#{users_idx}.jpg")
    users_idx += 1
end

GROUP_PHOTOS = []

groups_idx = 1
while groups_idx <= 7 do
  GROUP_PHOTOS.push("https://s3.amazonaws.com/meetnow-DEV/groups/group000#{groups_idx}.png")
  groups_idx += 1
end


User.destroy_all
Group.destroy_all
Event.destroy_all
# Comment.destroy_all
Membership.destroy_all
Organizer.destroy_all
Rsvp.destroy_all

guest = User.create!(first_name: 'Guest', password: "passwordsafe", last_name: 'Xin', email: 'awesome_guest@gmail.com', city: 'nyc', image: "https://s3.amazonaws.com/meetnow-DEV/meetNow/elon.jpg")
me = User.create!(first_name: 'Terrance', password: "123abc", last_name: 'Xin', email: 'tx@gmail.com', city: 'nyc', image: "https://s3.amazonaws.com/meetnow-DEV/meetNow/txin.jpg")

i = 1
300.times do
  User.create!(password: "123abc", first_name: Faker::Friends.character, last_name: "Xin", email: Faker::Internet.email, image: USER_PHOTOS.sample)
  i += 1
end


user_ids = User.all.ids

category_array = ["Tech", "Fitness", "Music", "Dance", "Health", "Game", "Culture", "Art"]

i = 1
5.times do
  Group.create!(name: (Faker::GameOfThrones.character + i.to_s), description: Faker::Friends.quote, category: category_array.sample, location: Faker::Address.state, about: GROUP_PHOTOS.sample)
  i += 1
end


group1 = Group.create!(
  name: "Coffee and Coding Conundrum NYC",
  description: "Kinda like speed dating-style pair programming. Language- and platform-agnostic. Come share, get exposed to new technologies, and meet nice people.

                No lectures, no presentations! Just coders with laptops open sharing their latest projects.

                You need to have something you're coding on to participate, but all skill levels are welcome!

                Coffee and Coding Conundrum started in Osaka, Japan in 2014. Let's make NYC its second home!",
  category: "Tech",
  location: "New York"
)

group2 = Group.create!(
  name: "Let's Taco About it",
  description: "TACO EVERY DAY!",
  category: "Food",
  location: 'LA'
)

group3 = Group.create!(
  name: "Hackers Hours",
  description: "Free office hours for programming help - any programming language, all skill levels. The format is super simple: you come with your laptop, sit and hang out and code, and flag down one of the organizers if you have a question.  That's it! If we can't answer your question, we'll find you someone who can, or at least point you in the right direction.",
  category: "Tech",
  location: 'New York'
)

group4 = Group.create!(
  name: "Google Developer Group",
  description: "We are software developers, designers, educators and students with an interest in learning about emergent technologies in areas including (but not limited to) mobile, web, wearables, cloud computing, education technology, data sciences and smart homes.",
  category: "Tech",
  location: 'New York'
)

group5 = Group.create!(
  name: "Ktown Cow Boys",
  description: "BCD Tofu House, Ichiumi, Maru, Wabar, Woorijip, Third Floor, BaekJeong KBBQ, Mad for Chicken, Circle.",
  category: "Fun",
  location: 'New York'
)

group6 = Group.create!(
  name: "NYC Machine Learning",
  description: "A group to discuss machine learning, information retrieval, natural language processing, knowledge representation, and artificial intelligence. Meetings will cover research papers and algorithms in the field. We'll also try to occasionally bring in a speaker to talk about their work.",
  category: "Tech",
  location: 'New York'
)

group7 = Group.create!(
  name: "#Resist: New York",
  description: "Concerned about where the country is heading? You're not alone. Join others who care about what's happening to democracy, equality, human rights, social justice, sustainability, and other important topics. It's ok if you've never been to a protest, march, or town hall -- start here. You really can make a difference.",
  category: "Movement",
  location: 'New York'
)

group8 = Group.create!(
  name: "Women Who Code NYC",
  description: "Women Who Code is a global nonprofit organization dedicated to inspiring women to excel in technology careers by creating a global, connected community of women in technology. The organization tripled in 2013 and has grown to be one of the largest communities of women engineers in the world.",
  category: "Tech",
  location: 'New York'
)

group9 = Group.create!(
  name: "FinTech Meetup",
  description: "The NY FinTech Meetup - Those entrepreneurs creating alpha driving technology

                • Knowledge sharing and networking with industry thought-leaders

                • Expert speakers range from nascent technology evangelists to venture capital veterans

                • Bridging the gap between FinTech Entrepreneurs and the investment community",
  category: "Business",
  location: 'Dubai'
)

group10 = Group.create!(
  name: "NYC PICKUP SOCCER-'SAY GOODBYE TO LEAGUE FEES'",
  description: "We will provide high quality Soccer tournaments, NYC PICKUP Soccer games, and yearly NYC World Cup; without the high cost!!!",
  category: "Sports",
  location: 'New York'
)

group11 = Group.create!(
  name: "Singles casual cocktail hour",
  description: "We are a meet-up group revolving around singles in the NYC area who like to get out, socialize, have some drinks and get to know each other. A fun laid back group always looking for new members.",
  category: "Fun",
  location: 'Internet'
)

group12 = Group.create!(
  name: "Da Meetup Group",
  description: "Welcome Asians and lovers of Asian culture!

                We host Asian events on our own and international events with other groups.

                Thank you very much for your support and we hope you enjoy our events!

                You don't have to be Asian to join our group,

                you just have to love the culture, the people, and the fun!

                If you have ideas for Asian events, Asian venues, or Asian themes, contact us!",
  category: "Social",
  location: "New York"
)

group_ids = Group.all.ids

Organizer.create!(user_id: guest.id, group_id: group1.id)
Organizer.create!(user_id: guest.id, group_id: group2.id)
Organizer.create!(user_id: me.id, group_id: group2.id)
250.times { Membership.create!(user_id: user_ids.shift, group_id: group_ids.sample) }
10.times { Event.create!(name: (Faker::GameOfThrones.character + i.to_s), time: Faker::Time.forward(60), location: Faker::GameOfThrones.city, description: "
  Over 12 weeks, you'll learn all the skills needed to begin a career as a web developer. Tuition is 22% of your first year's salary. Prior programming experience isn't required, but you’ll need lots of tenacity and a passion for building cool stuff. Over 1,700 App Academy grads work as developers at top tech companies like Google, Facebook, Uber and more, and earn an average salary of $105,000 in SF and $89,000 in NYC.", group_id: group_ids.sample) }


event_ids = Event.all.ids
user_ids = User.all.ids
6.times { Rsvp.create!(user_id: user_ids.shift, event_id: event_ids.sample) }
