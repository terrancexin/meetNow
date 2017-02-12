## Component Hierarchy

**AuthFormContainer**
- SignUpForm
  - SignUpErrors
- LoginForm
  - LoginErrors

**HomeContainer**
- Logout
- Search bar
- Event feed
- Nav bar
- Side bar

**GroupsContainer**
- Groups page
  + EventContainer
- Group creation page

**EventsContainer**
- Events page
  + EventIndex
- Events creation page

**Calendar Container**
- Calendar

**SearchContainer**
- Search bar


## Routes

|Path                              |Component            |
|----------------------------------|---------------------|
|"/signup"                         |"AuthFormContainer"  |
|"/login"                          |"AuthFormContainer"  |
|"/home"                           |"HomeContainer"      |
|"/home/events/"                   |"EventsListContainer"|
|"/home/groups"                    |"GroupListContainer" |
|"/group"                          |"GroupContainer"     |
|"/group/create"                   |"GroupFormContainer" |
|"/group/:groupId"                 |"GroupIndexContainer"|
|"/group/:groupId/event/:eventId"  |"EventContainer"     |
|"/group/:groupId/event/create"    |"EventFormContainer" |
