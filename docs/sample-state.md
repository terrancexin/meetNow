```js
{
  session: {
    currentUser: {
      id: 1,
      username: "guest"
    },
    errors: {
      errors: []
    }
  },

  groups: {
    1: {
      id: 1,
      name: "group name 1",
      description: 'text',
      members: [user1, user2, user3, user4, user5]
    },
    2: {
      id: 2,
      name: "group name 2",
      description: 'text',
      members: [user1, user2, user3, user4, user5]
    }
  },

  groupDetail: {
    id: 1,
    name: "group name 1",
    organizer: {
        id: 4,
        name: "John Smith",
        photo_url: "John.jpg"
    },
    background_image_url: "background.jpg"
    profile_image_url: "group1.jpg",
    who: "programmers",
    description: "code code code",
    city: "NYC",
    state: "NY"
  },

  events: {
    1: {
      id: 1,
      name: "Thirsty Thursday",
      address: "123 A street",
      city: "NYC",
      state: "NY",
      time: 1230,
      date: "2017-01-01"
    },
    2: {
      id: 2,
      name: "TGIM",
      address: "123 B street",
      city: "NYC",
      state: "NY",
      time: 1230,
      date: "2017-01-02"
    }
  }
}
```
