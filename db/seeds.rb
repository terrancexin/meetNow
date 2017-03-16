# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
USER_PHOTOS = []
users_idx = 1
while users_idx <= 600 do
    USER_PHOTOS.push("https://s3.amazonaws.com/meetnow-DEV/users/#{users_idx}.jpg")
    users_idx += 1
end

User.destroy_all
Group.destroy_all
Event.destroy_all
Membership.destroy_all
Organizer.destroy_all
Rsvp.destroy_all

guest = User.create!(first_name: 'Guest', password: "passwordsafe", last_name: 'Musk', email: 'awesome_guest@gmail.com', city: 'Los Angeles, California', image: "https://s3.amazonaws.com/meetnow-DEV/meetNow/elon.jpg", bio: "CEO, and CTO of SpaceX; co-founder, CEO, and product architect of Tesla Inc.; co-founder and chairman of SolarCity; co-chairman of OpenAI; co-founder of Zip2; and founder of X.com, which merged with Confinity and took the name PayPal. As of February 2017, he has an estimated net worth of 13.9 billion, making him the 94th wealthiest person in the world. In December 2016, Musk was ranked 21st on Forbes list of The World's Most Powerful People.")
me = User.create!(first_name: 'Terrance', password: "meetnow", last_name: 'Xin', email: 'tx@gmail.com', city: 'New York, NY', image: "https://s3.amazonaws.com/meetnow-DEV/meetNow/txin.jpg", bio: "The pursuit of happiness to me means making progress towards learning and change. This is why I'm passionate about technology and software development. I love solving everyday problems by leveraging the power of our modern technology.")

SAMPLE_DES = [
  "True love will never put a blockade between you and your dreams. Be it the love of your family, friends or significant other, if the people who surround you do not support, encourage or urge you in the direction of your destiny, they may not be the best people to keep in your company. You are a product of your environment — choose yours carefully. Surround yourself with the doers, the believers, the dreamers and the thinkers. Only they will lift you higher",
  "Fear holds many of us back in life. The fear of failing, of rejection and of other’s opinions can impact us so heavily that we only fail ourselves by our own inaction. We’ve heard it many times before: The thought of something is often worse than the thing itself. It is no different than fearing failure if we go in search of our dreams. Don’t underestimate your own resilience",
  "There is no such thing as too old or too young when it comes to chasing your dreams. There is no such thing as a right time or a wrong time, either. It is simply a matter of deciding what it is you want to do and taking the necessary steps to get there. Wherever we are in the world, and in whatever circumstances we find ourselves, only we can decide to take the leap of faith and make our dreams realities",
  "What you think about, you bring about. If you put all your focus, energy and positive thoughts toward whatever it is you want, you’d be amazed at what opportunities come knocking. Whatever it is, however it happens, if you want something badly enough, it’s as if the stars re-align and are only too willing to give to you whatever your heart desires. Call it fate, coincidence, beginner’s luck or whatever sits best with you, but when you put that time and energy into something with all you have, you will manifest it into your life.",
  "Advocates from Dwayne “The Rock” Johnson to Michael Jordan to Johnny Depp to J.K. Rowling and many more successful people worldwide have sworn that success in life cannot come about without great failures. No matter how many times you get knocked back, rejected or turned away, either personally or professionally, the key is to never accept defeat. Always move forward and never stop learning. See your failures as valuable lessons on the road to success, learn from them, grow with them and never give up on your dreams.",
  "You will meet many a person who will share opinions regarding your life and your work, whether you ask or not. Some will agree with you, some won’t. C’est la vie! You will never, ever, please everybody. At the end of the day, the only person you need compare yourself to is the person you were yesterday. As long as you’re working toward your own happiness, don’t let the opinions of others divert you, especially those from people who have not yet found their own paths in life. We are all unique, what we decide to do with our time is entirely up to us; listen to your heart and answer only to yourself.",
  "The greatest riches we can ever hope to have are the ones that make us truly happy. Where do you find your happiness? To where does your heart call? It may be a profession, a hobby, a place, a person, a pet or a lifestyle, but it’s only when we stop and acknowledge what it is our hearts want that we will find our greatest treasures. These are the treasures that will bring joy and happiness into our lives; this is where the heart is.",
  "Above all, never stop dreaming. It’s the possibility of having a dream come true that makes life interesting. Just believe anything is possible.",
  "Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars to change the world.",
  "Be like water making its way through cracks. Do not be assertive, but adjust to the object, and you shall find a way around or through it. If nothing within you stays rigid, outward things will disclose themselves. Empty your mind, be formless. Shapeless, like water. If you put water into a cup, it becomes the cup. You put water into a bottle and it becomes the bottle. You put it in a teapot, it becomes the teapot. Now, water can flow or it can crash. Be water, my friend.",
  "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
  "A turning point in my life came when love became my default choice for twenty-one straight days. I wondered what opportunities might open up. I wondered what connections might be repaired. I wondered what moments I might capture that I would have otherwise missed. I wondered who I might become",
  "Once upon a time, there was a girl who could do anything in the world she wanted.  All she had to do was choose something and focus.  So one day she sat down in front of a blank canvas and began to paint.  Every stroke was more perfect than the next, slowly and gracefully converging to build a flawless masterpiece.  And when she eventually finished painting, she stared proudly at her work and smiled",
  "A big part of your life is a result of the choices you make.  And if you don’t like your life – if it completely lacks excitement and passion – it’s time to start making changes and better choices.",
  "There is good reason why you should wake each morning and mindfully consider what and who you will give your day to.  Because unlike other things in life – money, entertainment, obligations, etc. – time is the one thing you can never get back once it’s gone.",
  "Greek philosopher Heraclitus once said: “No man ever steps in the same river twice, for it's not the same river and he's not the same man.” The world around us is rapidly changing. The rate of change is accelerating. Tech sector, evolving into a tech ecosystem, is at the forefront of many changes that we experience daily."
]

i = 1
600.times do
  User.create!(password: "meetnow", first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: "user#{i}@gmail.com", image: USER_PHOTOS.shift, city: Faker::Address.state, bio: SAMPLE_DES.sample)
  i += 1
end


user_ids = User.all.ids

LOCATION = [
  "New York, NY",
  "LA, California",
  "Dubai",
  "159 W 25th St, New York, NY 10001",
  "Hollywood, Los Angeles, CA",
  "Tokyo, Japan",
  "Manhattan, NY 10036"
]

# i = 1
# 20.times do
#   Group.create!(
#     name: (Faker::Food.ingredient + " " + group_name.sample + i.to_s),
#     description: GROUP_DESCRIPTION.sample,
#     category: category_array.sample,
#     location: LOCATION.sample,
#     photo_url: GROUP_PHOTOS.sample
#   )
#   i += 1
# end


group1 = Group.create!(
  name: "Coffee and Coding Conundrum NYC",
  description: "Kinda like speed dating-style pair programming. Language- and platform-agnostic. Come share, get exposed to new technologies, and meet nice people. No lectures, no presentations! Just coders with laptops open sharing their latest projects. You need to have something you're coding on to participate, but all skill levels are welcome! Coffee and Coding Conundrum started in Osaka, Japan in 2014. Let's make NYC its second home!",
  category: "Tech",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/coffee_and_coding.jpeg",
  founded: Faker::Time.backward(1000)
)

group2 = Group.create!(
  name: "Let's Taco About it",
  description: "There are 1 billion taco joints in NYC. Let's try each of them. Taco Night is a project founded by Mike in 2015. The goal; rediscover Taco life in NYC since returning to NYC from Dallas, TX. Join DeRM & Mike as we travel the city tasting as many tasty tacos as possible in this lifetime. We meet for a taco or two (or more) and a drink or two (or more) and fun conversation. And if you have a favorite taco spot in NYC or beyond let us know, we just might end up there.",
  category: "Food",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/taco_about_it.png",
  founded: Faker::Time.backward(1000)
)

group3 = Group.create!(
  name: "Hackers Hours",
  description: "Free office hours for programming help - any programming language, all skill levels. The format is super simple: you come with your laptop, sit and hang out and code, and flag down one of the organizers if you have a question.  That's it! If we can't answer your question, we'll find you someone who can, or at least point you in the right direction.",
  category: "Tech",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/hacker_hours.jpeg",
  founded: Faker::Time.backward(1000)
)

group4 = Group.create!(
  name: "Google Developer Group",
  description: "We are software developers, designers, educators and students with an interest in learning about emergent technologies in areas including (but not limited to) mobile, web, wearables, cloud computing, education technology, data sciences and smart homes. Our events can vary from featured Tech Talks (40 mins or more) to Short Talks (20 mins), Lightning Talks (5 mins) as well as focused events (workshops, hackathons, study jams).",
  category: "Tech",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/google_dev_group.jpeg",
  founded: Faker::Time.backward(1000)
)

group5 = Group.create!(
  name: "Drink & Draw Koreatown",
  description: "Drawing and working on art can be either a) Intimidating if you don't do it often, or b) isolating if you do it too much. This is a weekly meet up for anyone who is looking to draw, color, sketch or work on any sort of art project with other people. The club will be a casual one, with little to no instruction, and we welcome all skill levels, from the bored-at-work doodlers, to professional artists.",
  category: "culture",
  location: "Los Angeles, CA",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/drink_and_draw.png",
  founded: Faker::Time.backward(1000)
)

group6 = Group.create!(
  name: "NYC Outdoor Adventure Workout",
  description: "This group will be focused on outdoor workouts in NYC and other events organized by Tamandua Expeditions (www.tamanduajungle.com). We are an eco-tourism company that runs trips to the Amazon Rainforest and offer adventure packed and meaningful experiences into one of the most bio-diverse areas on the planet. We want to bring the adventure of the jungle to NYC and get a group together to do fun, challenging, and badass workouts outside! We will be organizing these workouts in Central Park (mostly on the Great Lawn or a near by open space) which will be free. We love the outdoors and being outside on grass is much better then staring at a wall in a gym. We will be doing high intensity exercises and we have awesome equipment that will make the workouts fun and exciting while getting us all into great shape. Hope to see you out there!",
  category: "fitness",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/adventures.jpg",
  founded: Faker::Time.backward(1000)
)

group7 = Group.create!(
  name: "The New York City Karaoke Meetup Group",
  description: "The New York City Karaoke Meetup Group will gather monthly to visit various karaoke venues museums in the New York City area as well as cultural events related to music. Members should freely send suggestions of different events and karaoke venues in New York City so that the Meetups reflect the interests of the group. This is a great opportunity to pick from the tons of karaoke venues and cultural events occurring in New York City every year and to meet new and interesting people who share a passion for music. House rules : To stay a member, you need to participate at least 6 times a year, (travelers are welcome of course), and 2 no shows will be removed. Rudeness to others are not tolerated, and will be removed immediately.",
  category: "mustic",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/karaoke.jpg",
  founded: Faker::Time.backward(1000)
)

group8 = Group.create!(
  name: "Women Who Code",
  description: "Women Who Code is a global nonprofit organization dedicated to inspiring women to excel in technology careers by creating a global, connected community of women in technology. The organization tripled in 2013 and has grown to be one of the largest communities of women engineers in the world.",
  category: "Tech",
  location: "San Francisco, CA",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/women_who_code.png",
  founded: Faker::Time.backward(1000)
)

group9 = Group.create!(
  name: "FinTech Meetup",
  description: "The NY FinTech Meetup - Those entrepreneurs creating alpha driving technology • Knowledge sharing and networking with industry thought-leaders • Expert speakers range from nascent technology evangelists to venture capital veterans • Bridging the gap between FinTech Entrepreneurs and the investment community",
  category: "tech",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/fintech.jpg",
  founded: Faker::Time.backward(1000)
)

group10 = Group.create!(
  name: "NYC PICKUP SOCCER-'SAY GOODBYE TO LEAGUE FEES'",
  description: "We will provide high quality Soccer tournaments, NYC PICKUP Soccer games, and yearly NYC World Cup; without the high cost!!!",
  category: "fitness",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/soccer.jpg",
  founded: Faker::Time.backward(1000)
)

group11 = Group.create!(
  name: "Singles casual cocktail hour",
  description: "We are a meet-up group revolving around singles in the LA area who like to get out, socialize, have some drinks and get to know each other. A fun laid back group always looking for new members.",
  category: "dance",
  location: "Los Angeles, CA",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/singles.jpeg",
  founded: Faker::Time.backward(1000)
)

group12 = Group.create!(
  name: "Princeton Sahaja Meditation",
  description: "All across the globe, people are seeking new sources of energy, yet within each of us lies the most transformative energy of all. It’s called Inner Energy or the Kundalini. Sahaja Yoga Meditation is a simple technique that lets you tap into that energy and harness its power to become better balanced and better connected to yourself emotionally, physically, and spiritually. If you're having trouble juggling the challenges in your life, Sahaja Yoga Meditation can help you manage stress, master your emotions and find solutions to your problems. You'll enjoy better health, better focus, and a deeper understanding of the universe and your place in it. We're a not-for-profit providing meditation to the community in over 120 countries. All our classes are always free.",
  category: "health",
  location: "Princeton, NJ",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/meditation.jpeg",
  founded: Faker::Time.backward(1000)
)

group13 = Group.create!(
  name: "Games R Us Board Gaming Group",
  description: "If you are interested in playing tons of new games and replaying lots of old ones, then come to the Game Group! All types/styles of games will be played. Meet new people, and keep that brain of yours active while having a good time.",
  category: "game",
  location: "Tokyo, Japan",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/game.png",
  founded: Faker::Time.backward(1000)
)

group14 = Group.create!(
  name: "Tokyo Cultural Exchange",
  description: "Meet new friends and share cultures while chit-chatting in English over lunch and coffee. This group is open to all who want to share language exchange, cultural experiences and make new friends. Beginners welcome! It's laid back, so please come and join us if you feel like it.",
  category: "game",
  location: "Tokyo, Japan",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/fujisan.jpg",
  founded: Faker::Time.backward(1000)
)

group15 = Group.create!(
  name: "Startup Grind Dubai",
  description: "Startup Grind is a global startup community designed to educate, inspire, and connect entrepreneurs. We host monthly events in 200 cities and 85 countries featuring successful local founders, innovators, & investors. The monthly events are open to anyone interested or involved in startups and there are no annual or membership fees.",
  category: "tech",
  location: "Dubai",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/startup_grind_dubai.jpeg",
  founded: Faker::Time.backward(1000)
)

group16 = Group.create!(
  name: "Let's Dance NYC",
  description: "What is our main purpose? To provide dancers like us a fun place to meet, play, learn, and dance. Meet with people across NJ, NY, PA, and beyond for every kind of dancing - Swing, Ballroom, Tango, Latin. Unlike other dance meetups, our meetup leaders are just volunteers who dance for the pleasure of it! Who should join us? Dancers & aspiring dancers (Singles or Couples) who are interested in social dancing as a hobby. Beginners who are looking for avenues to learn and practice social dancing.",
  category: "dance",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/dance.jpeg",
  founded: Faker::Time.backward(1000)
)

group17 = Group.create!(
  name: "Paint Parties with Wine",
  description: "Our Studio is the upscale destination in NYC, where you can Paint, Drink, and enjoy the Fun of it!! At our studio, anyone can be an artist and have fun being creative - no art experience required! In two or three hours you can create a festive, whimsical and colorful painting while sipping on your favorite beverage. We are a BYOB studio. You can bring your own drinks and snacks! We provide glassware, utensils, plates and all of your art supplies! Join us for an unforgettable evening of fun, friends, and fine art where you enjoy the cocktails* and we provide the canvases! Bring your friends, open your favorite bottle of wine and get ready to be inspired by our experienced, fun loving artists who will guide you step-by-step to unleash your creativity . At the end of the night...you will leave our studio with your wonderful masterpiece.",
  category: "art",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/paint_and_wine.jpeg",
  founded: Faker::Time.backward(1000)
)

group18 = Group.create!(
  name: "App Academy NYC",
  description: "App Academy is a full-time, 12-week software engineering course. From thousands of applications, we've selected the top 3%. We're lucky to have an exceptional and diverse group of highly motivated self-starters, all super smart, and lots of fun. Our program teaches students everything they need to go to work immediately, including Ruby, Rails, SQL, JavaScript and React (for more info, check out our curriculum). The core skills we're training are completely language-agnostic. Students learn how to ramp up on new tech fast, how to write scalable, robust code and how to architect software solutions to real-world problems. They graduate with Github repos containing thousands of lines of code showing what they're capable of. By the end of our program, our graduates will be ready for whatever you have to throw at them; whether it's Ruby, JS, Python, etc. Companies employing App Academy graduates include: Facebook, Google, Apple, Airbnb, Uber, LinkedIn, Condé Nast, The New York Times, and Tumblr.",
  category: "tech",
  location: "New York, NY",
  photo_url: "https://s3.amazonaws.com/meetnow-DEV/groups/aa.png",
  founded: Faker::Time.backward(1000)
)

group_ids = Group.all.ids

Organizer.create!(user_id: guest.id, group_id: group1.id)
Organizer.create!(user_id: guest.id, group_id: group2.id)
Organizer.create!(user_id: me.id, group_id: group2.id)

600.times { Membership.create!(user_id: user_ids.shift, group_id: group_ids.sample) }

70.times { Event.create!(
  name: Faker::Superhero.name,
  time: Faker::Time.forward(200),
  location: LOCATION.sample,
  description: SAMPLE_DES.sample,
  group_id: group_ids.sample)
}


event_ids = Event.all.ids
user_ids = User.all.ids
600.times { Rsvp.create!(user_id: user_ids.shift, event_id: event_ids.sample) }
