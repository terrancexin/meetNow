## Component Hierarchy

**WelcomeContainer**
- Header(startMeetNow, logo, language, signup, login, demo)
- Cover(signup)
- MovementListItems
- GroupsListItems
- Footer(startMeetNow, personalInfo, login)
- AuthForm(SignUpForm)

**HomeContainer**
- Header(startMeetNow, logo, icons)
- GroupsListItems
- Footer(startMeetNow, personalInfo, logout)
- Icon(profile, logout)
- SearchBar(location, calendarToggle)

**AuthFormContainer**
- SignUpForm
- Footer(startMeetNow, personalInfo, login/logout)
- LogInForm
- Header(startMeetNow, logo, language, login, signup)

**GroupContainer**
- GroupIndex
- GroupItems
- Header(startMeetNow, logo, icons)
- Icon(profile, logout)
- Footer(startMeetNow, personalInfo, login/logout)
- EventsContainer
- groupSideNav

**GroupFormContainer**
- GroupForm
- Header(startMeetNow, logo, icons)
- Icon(profile, logout)

**EventContainer**
- EventIndex
- EventItems
- Header(startMeetNow, logo, icons)
- Icon(profile, logout)
- Footer(startMeetNow, personalInfo, login/logout)
- RSVP button

**EventFormContainer**
- EventForm
- Header(startMeetNow, logo, icons)
- Icon(profile, logout)

**Calendar Container**
- Calendar

**SearchContainer**
- Search bar

**ProfileFormContainer**
- profileForm

## Routes

|Path                                   |Component             |
|---------------------------------------|----------------------|
|"/"                                    |"App"                 |
|"/signup"                              |"AuthFormContainer"   |
|"/login"                               |"AuthFormContainer"   |
|"/home"                                |"HomeContainer"       |
|"/home/groups"                         |"GroupContainer"      |
|"/home/groups/create"                  |"GroupFormContainer"  |
|"/home/groups/:groupId"                |"GroupContainer"      |
|"/home/groups/:groupId/event/create"   |"EventFormContainer"  |
|"/home/groups/:groupId/event/:eventId" |"EventsContainer"     |
|"/home/groups/:user/:userId/edit"      |"ProfileFormContainer"|
