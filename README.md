# MeetNow! ([Live](https://www.meetnow.life))

MeetNow! is a Full Stack Web Application inspired by Meetup. The single page frontend is built using JavaScript, React.js, and Redux framework. The backend is powered by Ruby on Rails sitting on a PostgreSQL database. If you're passionate about something, why wait? Try it out using the 'Guest' login and Let's [MeetNow!](https://www.meetnow.life/)

![MeetNow](/docs/pics/meetnow.gif)

## Features & Implementation

* [MeetNow!](#the-core-of-meetnow!)
  - Explore, Search, Join Groups, and RSVP Events
  - CRUD for Groups and Events
  - List of Events for each Group
  - List of attendees for each Event
  - See each user's profile
  - List of members for each Group
* [Groups/Events](#events)
  - Create, Retrieve, Update, Delete (organizers only)
  - Join/Leave, RSVP (member/logged-in users only)
  - Clickable on other members/users profiles
* [Search Bar](#search-bar)
  - Search for groups by group name
* [New User & Log in](#new-user-&-logging-in)
  - Create an account
  - Login / Logout / Guest login for exploration
* [Authentication](#authentication)
  - Secure custom authentication system that hashes/salts passwords using BCrypt

### The core of MeetNow!
Users can create groups to bring together passionate individuals who are eager to share what they love.
The groups are stored as a single table in the database. Groups have many users, many events, many organizers through each association tables accordingly.

![MeetNow](/docs/pics/group.png)

### Events
Events are nested under a group, so that there are no events that stand-alone. Only the members of a group are able to create an event for their group.
A user must be logged in and be a part of that group in order to RSVP each events.
The Event components will re-render under groups show page as the user can join, leave, comment, and see who is attending each event.

![MeetNow](/docs/pics/event.png)

### Search bar
Users can search for groups based on group names. The groups are fetched using ActiveRecord queries. An includes method is used to prefetch the database to prevent an inefficient N+1 query.

```ruby
  search_bar_filter = params[:filter]
  Group.includes(:users, :events).where("LOWER(name) LIKE ?", "#{search_bar_filter.downcase}%")
```

![MeetNow](/docs/pics/search.png)


### New user & logging in
Login inputs are validated on both the front-end and back-end. Client side validations check for password length and unique email addresses. Passwords are hashed using [BCrypt](https://en.wikipedia.org/wiki/Bcrypt) before being stored on the server. Plaintext passwords are never stored.

Server side validation occurs at both the model and the database. These redundancies are useful to ensure the integrity of data stored within the database and generally considered best practice.

### Authentication
A session token is stored in both the `users` table and as a cookie on the user's machine. These tokens are compared to find the active user and retrieve the relevant information. On log out, the cookie is cleared and the session token on the database is reset.
```ruby
# Ruby - app/controllers/application_controller.rb
def current_user
  @user ||= User.find_by(session_token: session[:session_token])
end
```

On the frontend, the user's session is stored in the React-Redux `store`. If a user refreshes the single page app, a bootstrapped `currentUser` is placed on the window to keep the user logged in.
```
# Ruby - app/views/static_pages/root.html.erb
<% if logged_in %>
  window.currentUser = <%= render(
    "api/users/user.json.jbuilder",
    user: current_user
  ).html_safe %>
<% end %>
```

## Future Directions for the Project

#### Live Chats
I plan to implement a messaging function that allows users to share ideas with each other.

#### Recommended Groups/Events
I plan to collect users' interests based on the groups they've joined:

1. Collect data in general to glean trends.
2. Use that data to recommend groups to users.

Recommended groups will be stored in a new join table `recommends` that will have the columns `group_id` and `user_id`.

#### Photos and Videos
Allow groups to post photos and videos.



Interested to see how this full-stack project was planned? [Go to development README](./docs)
