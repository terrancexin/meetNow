## Component Hierarchy

**AuthFormContainer**
- SignUpForm
  - SignUpErrors
- LoginForm
  - LoginErrors

**HomeContainer**
- Logout
- Search bar
- Nav bar
- Side bar

**GroupContainer**
- GroupIndex
- GroupPage
- GroupList

**GroupFormContainer**
- GroupPage
  + EventContainer
- GroupCreate

**EventsContainer**
- EventsPage
  + EventIndex
- EventsList
- EventIndex

**EventFormContainer**
- EventPage
- EventCreate

**Calendar Container**
- Calendar

**SearchContainer**
- Search bar


## Routes

|Path                                   |Component            |
|---------------------------------------|---------------------|
|"/"                                    |"App"                |
|"/signup"                              |"AuthFormContainer"  |
|"/login"                               |"AuthFormContainer"  |
|"/home"                                |"HomeContainer"      |
|"/home/events/"                        |"EventsContainer"|
|"/home/groups"                         |"GroupContainer" |
|"/home/group"                          |"GroupContainer"     |
|"/home/group/create"                   |"GroupFormContainer" |
|"/home/group/:groupId"                 |"GroupsContainer"|
|"/home/group/:groupId/event/:eventId"  |"EventsContainer"     |
|"/home/group/:groupId/event/create"    |"EventFormContainer" |
