# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
USER_PHOTOS = []
users_idx = 1
while users_idx <= 300 do
    USER_PHOTOS.push("https://s3.amazonaws.com/meetnow-DEV/users/#{users_idx}.jpg")
    users_idx += 1
end

GROUP_PHOTOS = []

groups_idx = 1
while groups_idx <= 8 do
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

guest = User.create!(first_name: 'Guest', password: "passwordsafe", last_name: 'Musk', email: 'awesome_guest@gmail.com', city: 'Los Angeles, California', image: "https://s3.amazonaws.com/meetnow-DEV/meetNow/elon.jpg", bio: "CEO, and CTO of SpaceX; co-founder, CEO, and product architect of Tesla Inc.; co-founder and chairman of SolarCity; co-chairman of OpenAI; co-founder of Zip2; and founder of X.com, which merged with Confinity and took the name PayPal. As of February 2017, he has an estimated net worth of 13.9 billion, making him the 94th wealthiest person in the world. In December 2016, Musk was ranked 21st on Forbes list of The World's Most Powerful People.")
me = User.create!(first_name: 'Terrance', password: "123abc", last_name: 'Xin', email: 'tx@gmail.com', city: 'New York City, NY', image: "https://s3.amazonaws.com/meetnow-DEV/meetNow/txin.jpg", bio: "Pursuit of happiness to me means making progress towards learning and change. This is why I'm passionate about technology and software development. I love solving everyday problems by leveraging the power of our modern technology. I truly believe in bringing people closer through web apps, around the world.")

i = 1
300.times do
  User.create!(password: "123abc", first_name: Faker::Friends.character, last_name: "Smith", email: "user#{i}@gmail.com", image: USER_PHOTOS.shift, city: Faker::Address.state, bio: Faker::Friends.quote)
  i += 1
end


user_ids = User.all.ids

category_array = ["Tech", "Fitness", "Music", "Dance", "Health", "Game", "Culture", "Art"]
group_name = ['workout', 'karaoke', 'meditation', 'trilingual', 'painting', 'tech', 'salsa', 'catan']

i = 1
30.times do
  Group.create!(name: (Faker::Food.ingredient + " " + group_name.sample + i.to_s), description: "This group explores the links between creativity and tech while providing a unique opportunity to network (and drinks!). Each event over the course of this meetup combines cocktails, appetizers, panelists, and speakers to create the perfect atmosphere for making new connections and facilitating innovative discussion. Examine how technology can be used to promote creativity and how creativity can inspire technology with us!", category: category_array.sample, location: Faker::HarryPotter.location, photo_url: GROUP_PHOTOS.sample)
  i += 1
end


group1 = Group.create!(
  name: "Coffee and Coding Conundrum NYC",
  description: "Kinda like speed dating-style pair programming. Language- and platform-agnostic. Come share, get exposed to new technologies, and meet nice people.

                No lectures, no presentations! Just coders with laptops open sharing their latest projects.

                You need to have something you're coding on to participate, but all skill levels are welcome!

                Coffee and Coding Conundrum started in Osaka, Japan in 2014. Let's make NYC its second home!",
  category: "Tech",
  location: "New York",
  photo_url: GROUP_PHOTOS.sample
)

group2 = Group.create!(
  name: "Let's Taco About it",
  description: "TACO EVERY DAY!",
  category: "Food",
  location: 'LA',
  photo_url: GROUP_PHOTOS.sample
)

group3 = Group.create!(
  name: "Hackers Hours",
  description: "Free office hours for programming help - any programming language, all skill levels. The format is super simple: you come with your laptop, sit and hang out and code, and flag down one of the organizers if you have a question.  That's it! If we can't answer your question, we'll find you someone who can, or at least point you in the right direction.",
  category: "Tech",
  location: 'New York',
  photo_url: GROUP_PHOTOS.sample
)

group4 = Group.create!(
  name: "Google Developer Group",
  description: "We are software developers, designers, educators and students with an interest in learning about emergent technologies in areas including (but not limited to) mobile, web, wearables, cloud computing, education technology, data sciences and smart homes.",
  category: "Tech",
  location: 'New York',
  photo_url: GROUP_PHOTOS.sample
)

group5 = Group.create!(
  name: "Ktown Cow Boys",
  description: "BCD Tofu House, Ichiumi, Maru, Wabar, Woorijip, Third Floor, BaekJeong KBBQ, Mad for Chicken, Circle.",
  category: "Fun",
  location: 'New York',
  photo_url: GROUP_PHOTOS.sample
)

group6 = Group.create!(
  name: "NYC Machine Learning",
  description: "A group to discuss machine learning, information retrieval, natural language processing, knowledge representation, and artificial intelligence. Meetings will cover research papers and algorithms in the field. We'll also try to occasionally bring in a speaker to talk about their work.",
  category: "Tech",
  location: 'New York',
  photo_url: GROUP_PHOTOS.sample
)

group7 = Group.create!(
  name: "#Resist: New York",
  description: "Concerned about where the country is heading? You're not alone. Join others who care about what's happening to democracy, equality, human rights, social justice, sustainability, and other important topics. It's ok if you've never been to a protest, march, or town hall -- start here. You really can make a difference.",
  category: "Movement",
  location: 'New York',
  photo_url: GROUP_PHOTOS.sample
)

group8 = Group.create!(
  name: "Women Who Code NYC",
  description: "Women Who Code is a global nonprofit organization dedicated to inspiring women to excel in technology careers by creating a global, connected community of women in technology. The organization tripled in 2013 and has grown to be one of the largest communities of women engineers in the world.",
  category: "Tech",
  location: 'New York',
  photo_url: GROUP_PHOTOS.sample
)

group9 = Group.create!(
  name: "FinTech Meetup",
  description: "The NY FinTech Meetup - Those entrepreneurs creating alpha driving technology

                • Knowledge sharing and networking with industry thought-leaders

                • Expert speakers range from nascent technology evangelists to venture capital veterans

                • Bridging the gap between FinTech Entrepreneurs and the investment community",
  category: "Business",
  location: 'Dubai',
  photo_url: GROUP_PHOTOS.sample
)

group10 = Group.create!(
  name: "NYC PICKUP SOCCER-'SAY GOODBYE TO LEAGUE FEES'",
  description: "We will provide high quality Soccer tournaments, NYC PICKUP Soccer games, and yearly NYC World Cup; without the high cost!!!",
  category: "Sports",
  location: 'New York',
  photo_url: GROUP_PHOTOS.sample
)

group11 = Group.create!(
  name: "Singles casual cocktail hour",
  description: "We are a meet-up group revolving around singles in the NYC area who like to get out, socialize, have some drinks and get to know each other. A fun laid back group always looking for new members.",
  category: "Fun",
  location: 'Internet',
  photo_url: GROUP_PHOTOS.sample
)

group_ids = Group.all.ids

Organizer.create!(user_id: guest.id, group_id: group1.id)
Organizer.create!(user_id: guest.id, group_id: group2.id)
Organizer.create!(user_id: me.id, group_id: group2.id)

300.times { Membership.create!(user_id: user_ids.shift, group_id: group_ids.sample) }

200.times { Event.create!(
  name: (Faker::GameOfThrones.character + i.to_s),
  time: Faker::Time.forward(60),
  location: Faker::GameOfThrones.city,
  description: "Greek philosopher Heraclitus once said: “No man ever steps in the same river twice, for it's not the same river and he's not the same man.” The world around us is rapidly changing. The rate of change is accelerating. Tech sector, evolving into a tech ecosystem, is at the forefront of many changes that we experience daily. This meetup is created for those who embrace the change, actively seek opportunities, and want be prepared and ready for the change in tech sector. It is a collective of lifelong learners who believe in lifelong learning, which is defined as the “ongoing, voluntary, and self-motivated pursuit of knowledge for either personal or professional reasons. Therefore, it not only enhances social inclusion, active citizenship, and personal development, but also self-sustainability, as well as competitiveness and employability.",
  group_id: group_ids.sample)
}


event_ids = Event.all.ids
user_ids = User.all.ids
300.times { Rsvp.create!(user_id: user_ids.shift, event_id: event_ids.sample) }
