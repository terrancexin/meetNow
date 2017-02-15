# Redux Structure

The application's state is organized by data type. Under each data type, there
may be sub-states. Each action is listed with the sequence of events that
results from its invocation, ending with the API or a reducer. Subscribed
components, i.e. containers, are listed at the end.

Using this document, you should be able to trace an **action** starting with
where it was invoked, through the **API**/**reducer** involved, and finally to
the **components** that update as a result. Once you start implementing your
Redux structure, you'll need to do the same.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` stores `currentUser` in the application's state.
* `removeCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` removes `currentUser` from the application's state.

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. the `ErrorReducer` stores the `form` in the application's state; `errors` are mapped to their respective forms
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. the `ErrorReducer` removes `errors` for a given `form` in the application's state.

## Group Cycles

### Groups API Request Actions

* `fetchAllGroups`
  0. invoked from `(HomePage)` `didMount`/`willReceiveProps`
  0. `GET /api/groups` is called.
  0. `receiveAllGroups` is set as the success callback.

//This method is for populating the groups the current user is a member of, populating the user-menu drop down accessed on top right of home page
* `fetchUserGroups`
  0. invoked from `(HomePage)` `didMount`/`willReceiveProps`
  0. `GET /api/user/:id/groups` is called.
  0. `receiveAllUserGroups` is set as the success callback.

* `createGroup`
  0. invoked from new group button `onClick`
  0. `POST /api/groups` is called.
  0. `receiveSingleGroup` is set as the success callback.

* `fetchSingleGroup`
  0. invoked from `GroupDetail` `didMount`/`willReceiveProps`
  0. `GET /api/groups/:id` is called.
  0. `receiveSingleGroup` is set as the success callback.

* `updateGroup`
  0. invoked from `GroupForm` `onSubmit`
  0. `POST /api/groups` is called.
  0. `receiveSingleGroup` is set as the success callback.

* `destroyGroup`
  0. invoked from delete group button `onClick`
  0. `DELETE /api/groups/:id` is called.
  0. `removeGroup` is set as the success callback.

### Groups API Response Actions

* `receiveAllGroups`
  0. invoked from an API callback
  0. the `GroupReducer` updates `groups` in the application's state.

* `receiveAllUserGroups`
  0. invoked from an API callback
  0. the `GroupReducer` updates `groups` in the application's state.

* `receiveSingleGroup`
  0. invoked from an API callback
  0. the `GroupReducer` updates `groups[id]` in the application's state.

<!-- * `removeGroup`
  0. invoked from an API callback
  0. the `GroupReducer` removes `groups[id]` from the application's state. -->

## Events Cycles

### Events API Request Actions

* `fetchAllEvents`
  0. invoked from `EventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/events` is called.
  0. `receiveAllEvents` is set as the success callback.

* `createEvent`
  0. invoked from new event button `onClick`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the callback.

* `updateEvent`
  0. invoked from `EventForm` `onSubmit`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `destroyEvent`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/events/:id` is called.
  0. `removeEvent` is set as the success callback.

### Events API Response Actions

* `receiveAllEvents`
  0. invoked from an API callback.
  0. The `Event` reducer updates `events` in the application's state.

* `receiveSingleEvent`
  0. invoked from an API callback.
  0. The `Event` reducer updates `events[id]` in the application's state.

* `removeEvent`
  0. invoked from an API callback.
  0. The `Event` reducer removes `events[id]` from the application's state.

## RSVP Cycles

### RSVPs API Request Actions

* `fetchAllRSVPs`
  0. invoked from `EventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/events/:id/rsvps` is called.
  0. `receiveAllRSVPs` is set as the success callback.

* `createRSVP`
  0. invoked from RSVP button `onClick`
  0. `POST /api/rsvps` is called.
  0. `receiveSingleRSVP` is set as the callback.

* `destroyRSVP`
  0. invoked from RSVP button `onClick`
  0. `DELETE /api/rsvps/:id` is called.
  0. `removeRSVP` is set as the success callback.

### RSVPs API Response Actions

* `receiveAllRSVPs`
  0. invoked from an API callback.
  0. The `RSVP` reducer updates `rsvps` in the application's state.

* `receiveSingleRSVP`
  0. invoked from an API callback.
  0. The `RSVP` reducer updates `rsvps[id]` in the application's state.

* `removeRSVP`
  0. invoked from an API callback.
  0. The `RSVP` reducer removes `rsvps[id]` from the application's state.


(Not sure how to do search)
## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `GroupSearchBar` `onChange` when there is text
  0. `GET /api/notes` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the success callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. The `SearchSuggestion` reducer updates `suggestions` in the application's state.

* `removeSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when empty
  0. The `SearchSuggestion` reducer resets `suggestions` in the application's state.
  1.
