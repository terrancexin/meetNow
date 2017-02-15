This is the proposal README. [Production README here](../README.md).

# MeetNow!: A Meetup Clone
### [MeetNow! Live](http://meet-now.herokuapp.com/)
![MeetNow](/docs/wireframes/01-welcome.png)


## Minimum Viable Product
#### MeetNow is a Meetup clone built using Ruby on Rails, ES6, and React+Redux.

The primary features of this website include:
- [x] Production README
- [x] Hosting on Heroku
- [ ] Authentication form
  - New account creation, login, and guest/demo login
- [ ] Groups (CRUD)
  - Join or leave groups.
  - Create, read, edit, and delete groups.
- [ ] Events (CRUD)
  - RSVP to events.
  - Create, read, edit, and delete events.
- [ ] Calendar (on group page)
- [ ] Search by location and group info (name, description)
- [ ] Bonus: Live chats (unique feature)
- [ ] Bonus: Categories
- [ ] Bonus: Calendar (for all groups in search results)

## Design Docs
- [Wireframes](wireframes)
- [React components](component-hierarchy.md)
- [API endpoints](api-endpoints.md)
- [DB schema](schema.md)
- [Sample State](sample-state.md)
- [Redux Structure](redux-structure.md)

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, by 6pm 2/14/2017)

**Objective:** Functioning rails project with front-end Authentication.

### Phase 2: Home page, Sign up page, Login page CSS (1 day, by 6pm 2/15/2017)

**Objective:** Home page for no current user, functional sign up, login, and a front page for signed in users.

### Phase 3: Groups, API, and components (2 days, by 6pm 2/17/2017)

**Objective:** A group page for individual groups, with the ability to join the groups. Groups can be created, read, edited, and destroyed through the API.

### Phase 4: Events (2 days, by 6pm 2/19/2017)

**Objective:** An events page for individual events, with the ability to rsvp. Events can be created, read, edited, and destroyed through the API.

### Phase 5: Calendar for group pages (1 day, by 6pm 2/20/2017)

**Objective:** A calendar on the group page showing all events being hosted by the group

### Phase 6: Search by location and group info (2 days, by 6pm 2/22/2017)

**Objective:** The ability to search for a group based on location and group description on the front page

### Phase 7: Bonus (2 day, by 2/24/2017)
- [ ] Allow users to message each other on the app to leave messages and plan between MeetNow members
- [ ] Add categories
- [ ] Calendar (for all groups in search results)
