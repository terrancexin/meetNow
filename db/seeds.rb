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
me = User.create!(first_name: 'Terrance', password: "meetnow", last_name: 'Xin', email: 'tx@gmail.com', city: 'New York City, NY', image: "https://s3.amazonaws.com/meetnow-DEV/meetNow/txin.jpg", bio: "Pursuit of happiness to me means making progress towards learning and change. This is why I'm passionate about technology and software development. I love solving everyday problems by leveraging the power of our modern technology. I truly believe in bringing people closer through web apps, around the world.")

i = 1
300.times do
  User.create!(password: "meetnow", first_name: Faker::Friends.character, last_name: "Smith", email: "user#{i}@gmail.com", image: USER_PHOTOS.shift, city: Faker::Address.state, bio: Faker::Friends.quote)
  i += 1
end


user_ids = User.all.ids

category_array = ["Tech", "Fitness", "Music", "Dance", "Health", "Game", "Culture", "Art"]
group_name = ['workout', 'karaoke', 'meditation', 'trilingual', 'painting', 'tech', 'salsa', 'catan']

GROUP_DESCRIPTION = [
  "True love will never put a blockade between you and your dreams. Be it the love of your family, friends or significant other, if the people who surround you do not support, encourage or urge you in the direction of your destiny, they may not be the best people to keep in your company. You are a product of your environment — choose yours carefully. Surround yourself with the doers, the believers, the dreamers and the thinkers. Only they will lift you higher",
  "Fear holds many of us back in life. The fear of failing, of rejection and of other’s opinions can impact us so heavily that we only fail ourselves by our own inaction. We’ve heard it many times before: The thought of something is often worse than the thing itself. It is no different than fearing failure if we go in search of our dreams. Don’t underestimate your own resilience",
  "There is no such thing as too old or too young when it comes to chasing your dreams. There is no such thing as a right time or a wrong time, either. It is simply a matter of deciding what it is you want to do and taking the necessary steps to get there. Wherever we are in the world, and in whatever circumstances we find ourselves, only we can decide to take the leap of faith and make our dreams realities",
  "What you think about, you bring about. If you put all your focus, energy and positive thoughts toward whatever it is you want, you’d be amazed at what opportunities come knocking. Whatever it is, however it happens, if you want something badly enough, it’s as if the stars re-align and are only too willing to give to you whatever your heart desires. Call it fate, coincidence, beginner’s luck or whatever sits best with you, but when you put that time and energy into something with all you have, you will manifest it into your life.",
  "Advocates from Dwayne “The Rock” Johnson to Michael Jordan to Johnny Depp to J.K. Rowling and many more successful people worldwide have sworn that success in life cannot come about without great failures. No matter how many times you get knocked back, rejected or turned away, either personally or professionally, the key is to never accept defeat. Always move forward and never stop learning. See your failures as valuable lessons on the road to success, learn from them, grow with them and never give up on your dreams.",
  "You will meet many a person who will share opinions regarding your life and your work, whether you ask or not. Some will agree with you, some won’t. C’est la vie! You will never, ever, please everybody. At the end of the day, the only person you need compare yourself to is the person you were yesterday. As long as you’re working toward your own happiness, don’t let the opinions of others divert you, especially those from people who have not yet found their own paths in life. We are all unique, what we decide to do with our time is entirely up to us; listen to your heart and answer only to yourself.",
  "The greatest riches we can ever hope to have are the ones that make us truly happy. Where do you find your happiness? To where does your heart call? It may be a profession, a hobby, a place, a person, a pet or a lifestyle, but it’s only when we stop and acknowledge what it is our hearts want that we will find our greatest treasures. These are the treasures that will bring joy and happiness into our lives; this is where the heart is.",
  "Above all, never stop dreaming. It’s the possibility of having a dream come true that makes life interesting. Just believe anything is possible.",
  "This group explores the links between creativity and tech while providing a unique opportunity to network (and drinks!). Each event over the course of this meetup combines cocktails, appetizers, panelists, and speakers to create the perfect atmosphere for making new connections and facilitating innovative discussion. Examine how technology can be used to promote creativity and how creativity can inspire technology with us!"
]

i = 1
20.times do
  Group.create!(
    name: (Faker::Food.ingredient + " " + group_name.sample + i.to_s),
    description: GROUP_DESCRIPTION.sample,
    category: category_array.sample,
    location: (Faker::Address.street_address + " " + Faker::Address.city + ", " + Faker::Address.state + " " + Faker::Address.zip),
    photo_url: GROUP_PHOTOS.sample
  )
  i += 1
end


group1 = Group.create!(
  name: "Coffee and Coding Conundrum NYC",
  description: "Kinda like speed dating-style pair programming. Language- and platform-agnostic. Come share, get exposed to new technologies, and meet nice people.

                No lectures, no presentations! Just coders with laptops open sharing their latest projects.

                You need to have something you're coding on to participate, but all skill levels are welcome!

                Coffee and Coding Conundrum started in Osaka, Japan in 2014. Let's make NYC its second home!",
  category: "Tech",
  location: "159 W 25th St, New York, NY 10001",
  photo_url: GROUP_PHOTOS.sample
)

group2 = Group.create!(
  name: "Let's Taco About it",
  description: "TACO EVERY DAY!",
  category: "Food",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group3 = Group.create!(
  name: "Hackers Hours",
  description: "Free office hours for programming help - any programming language, all skill levels. The format is super simple: you come with your laptop, sit and hang out and code, and flag down one of the organizers if you have a question.  That's it! If we can't answer your question, we'll find you someone who can, or at least point you in the right direction.",
  category: "Tech",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group4 = Group.create!(
  name: "Google Developer Group",
  description: "We are software developers, designers, educators and students with an interest in learning about emergent technologies in areas including (but not limited to) mobile, web, wearables, cloud computing, education technology, data sciences and smart homes.",
  category: "Tech",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group5 = Group.create!(
  name: "Ktown Cow Boys",
  description: "BCD Tofu House, Ichiumi, Maru, Wabar, Woorijip, Third Floor, BaekJeong KBBQ, Mad for Chicken, Circle.",
  category: "Fun",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group6 = Group.create!(
  name: "NYC Machine Learning",
  description: "A group to discuss machine learning, information retrieval, natural language processing, knowledge representation, and artificial intelligence. Meetings will cover research papers and algorithms in the field. We'll also try to occasionally bring in a speaker to talk about their work.",
  category: "Tech",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group7 = Group.create!(
  name: "#Resist: New York",
  description: "Concerned about where the country is heading? You're not alone. Join others who care about what's happening to democracy, equality, human rights, social justice, sustainability, and other important topics. It's ok if you've never been to a protest, march, or town hall -- start here. You really can make a difference.",
  category: "Movement",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group8 = Group.create!(
  name: "Women Who Code NYC",
  description: "Women Who Code is a global nonprofit organization dedicated to inspiring women to excel in technology careers by creating a global, connected community of women in technology. The organization tripled in 2013 and has grown to be one of the largest communities of women engineers in the world.",
  category: "Tech",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group9 = Group.create!(
  name: "FinTech Meetup",
  description: "The NY FinTech Meetup - Those entrepreneurs creating alpha driving technology

                • Knowledge sharing and networking with industry thought-leaders

                • Expert speakers range from nascent technology evangelists to venture capital veterans

                • Bridging the gap between FinTech Entrepreneurs and the investment community",
  category: "Business",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group10 = Group.create!(
  name: "NYC PICKUP SOCCER-'SAY GOODBYE TO LEAGUE FEES'",
  description: "We will provide high quality Soccer tournaments, NYC PICKUP Soccer games, and yearly NYC World Cup; without the high cost!!!",
  category: "Sports",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group11 = Group.create!(
  name: "Singles casual cocktail hour",
  description: "We are a meet-up group revolving around singles in the NYC area who like to get out, socialize, have some drinks and get to know each other. A fun laid back group always looking for new members.",
  category: "Fun",
  location: '159 W 25th St, New York, NY 10001',
  photo_url: GROUP_PHOTOS.sample
)

group_ids = Group.all.ids

Organizer.create!(user_id: guest.id, group_id: group1.id)
Organizer.create!(user_id: guest.id, group_id: group2.id)
Organizer.create!(user_id: me.id, group_id: group2.id)

300.times { Membership.create!(user_id: user_ids.shift, group_id: group_ids.sample) }

EVENT_DESCRIPTION = [
  "Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars to change the world.",
  "Be like water making its way through cracks. Do not be assertive, but adjust to the object, and you shall find a way around or through it. If nothing within you stays rigid, outward things will disclose themselves. Empty your mind, be formless. Shapeless, like water. If you put water into a cup, it becomes the cup. You put water into a bottle and it becomes the bottle. You put it in a teapot, it becomes the teapot. Now, water can flow or it can crash. Be water, my friend.",
  "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
  "A turning point in my life came when love became my default choice for twenty-one straight days. I wondered what opportunities might open up. I wondered what connections might be repaired. I wondered what moments I might capture that I would have otherwise missed. I wondered who I might become",
  "Once upon a time, there was a girl who could do anything in the world she wanted.  All she had to do was choose something and focus.  So one day she sat down in front of a blank canvas and began to paint.  Every stroke was more perfect than the next, slowly and gracefully converging to build a flawless masterpiece.  And when she eventually finished painting, she stared proudly at her work and smiled",
  "A big part of your life is a result of the choices you make.  And if you don’t like your life – if it completely lacks excitement and passion – it’s time to start making changes and better choices.",
  "There is good reason why you should wake each morning and mindfully consider what and who you will give your day to.  Because unlike other things in life – money, entertainment, obligations, etc. – time is the one thing you can never get back once it’s gone.",
  "Greek philosopher Heraclitus once said: “No man ever steps in the same river twice, for it's not the same river and he's not the same man.” The world around us is rapidly changing. The rate of change is accelerating. Tech sector, evolving into a tech ecosystem, is at the forefront of many changes that we experience daily."
]

300.times { Event.create!(
  name: (Faker::GameOfThrones.character + i.to_s),
  time: Faker::Time.forward(60),
  location: (Faker::Address.street_address + " " + Faker::Address.city + ", " + Faker::Address.state + " " + Faker::Address.zip),
  description: EVENT_DESCRIPTION.sample,
  group_id: group_ids.sample)
}


event_ids = Event.all.ids
user_ids = User.all.ids
300.times { Rsvp.create!(user_id: user_ids.shift, event_id: event_ids.sample) }
