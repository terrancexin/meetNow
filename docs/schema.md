# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
first_name      | string    | not null
last_name       | string    | not null
city            | string    | not null
state           | string    | not null
image_url       | string    | not null
bio             | string    |


## groups
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
category_id         | integer   | not null, foreign key (references categories), indexed
organizer_id        | integer   | not null, foreign key (references users), indexed
name                | string    | not null
background_image_url| string    | not null
profile_image_url   | string    | not null
who                 | string    | not null
description         | text      | not null
city                | string    | not null
state               | string    | not null
event_id

## membership
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
group_id    | integer   | not null, foreign key (references group)

## events
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
group_id       | integer   | not null, foreign key (references groups), indexed
name           | string    | not null
time           | date      | not null
yes_rsvp_count | integer   | not null
description    | text      | not null
address        | string    | not null
city           | string    | not null
state          | string    | not null
country        | string    | not null

## rsvps
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
event_id    | integer   | not null, foreign key (references events), indexed
user_id     | integer   | not null, foreign key (references users), indexed
